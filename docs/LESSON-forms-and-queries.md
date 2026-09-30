# Lesson: React Hook Form + Zod + TanStack Query

Every `[X#]` marker in this guide matches a comment in the code. Open the file side by side with this guide and follow the numbers.

| Prefix | Topic | File |
|---|---|---|
| `Q` | TanStack Query setup | `app/providers.tsx` |
| `Z` | Zod schema | `lib/schemas/register.ts` |
| `F` | React Hook Form | `app/demo/form/page.tsx` |
| `U` | `useQuery` | `app/demo/query/page.tsx` |

Run `npm run dev`, then open:

- http://localhost:3000/demo/form
- http://localhost:3000/demo/query

Install command (already done in this repo):

```bash
npm i react-hook-form zod @hookform/resolvers @tanstack/react-query
```

---

## Part 1: Zod, which describes and checks data (`lib/schemas/register.ts`)

**Why:** TypeScript types disappear at runtime. User input and API responses can hold anything. Zod checks the data **while the app runs** and also gives you the TypeScript type.

- **[Z1]** `z.object({...})` defines the shape. Each key is a field with its own rules.
- **[Z2]** Rules chain: `z.string().trim().min(2, "message")`. The last argument is the error message the user sees.
- **[Z3]** `z.email()` is a built-in format check (Zod v4 syntax; v3 used `z.string().email()`).
- **[Z4]** `<input>` values are **always strings**. `z.coerce.number()` converts `"20"` to `20` before checking `.min(18)`.
- **[Z5]** `z.enum([...])` allows only the listed values.
- **[Z6]** `.refine(fn, msg)` adds a custom rule. Here the checkbox must be `true`.
- **[Z7]** A `.refine` on the **whole object** can compare fields, for example password against confirmPassword.
- **[Z8]** `path: ["confirmPassword"]` decides which field shows the error. Without it, the error has no field to show under.
- **[Z9]** `z.input` / `z.output` give you types derived from the schema. There is no separate `interface` to keep in sync.
  - `input` is what the form holds (`age: string`)
  - `output` is what comes out after validation (`age: number`)
  - For simple schemas with no coercion, `z.infer<typeof schema>` is enough.

Try it in class:

```ts
registerSchema.safeParse({ name: "A" }); // { success: false, error: ... }
registerSchema.parse({ name: "A" });     // throws ZodError
```

---

## Part 2: React Hook Form, which manages the form (`app/demo/form/page.tsx`)

**Why:** A `useState` per field re-renders on every keystroke and needs a lot of wiring. RHF keeps inputs **uncontrolled** (it reads them through refs), so re-renders stay low and the code stays short.

- **[F1]** Forms need events, so the file starts with `"use client"`.
- **[F2]** `useForm<Input, Context, Output>`: the 3rd generic makes `onSubmit` receive the **validated** type.
- **[F3]** `register`: connects an input.
- **[F4]** `handleSubmit(onSubmit)`: runs validation, and calls `onSubmit` **only if everything passes**.
- **[F5]** `formState`: `errors`, `isSubmitting`, `isSubmitSuccessful`, `isDirty`, `isValid`...
- **[F6]** `zodResolver(schema)` connects the two libraries. **Zod decides validity, RHF displays it.**
- **[F7]** `mode` sets **when** validation runs:
  - `onSubmit` (default): only on submit
  - `onTouched`: after the user leaves a field, then on every change
  - `onChange`: every keystroke (noisy)
- **[F8]** `onSubmit(data)` receives clean, typed data. This is where you call the API.
- **[F9]** `noValidate` stops the browser's own popups so only one set of messages shows.
- **[F10]** `{...register("name")}` spreads `name`, `onChange`, `onBlur` and `ref` onto the input.
- **[F11]** Native `<select>` and checkboxes work with `register` too.
- **[F12]** The cross-field error from [Z7]/[Z8] appears under the field named in `path`.
- **[F13]** Disable the button while `isSubmitting` to prevent double submits.
- **[F14]** A small `Field` helper keeps label, input and error consistent. `htmlFor` + `id` makes the label clickable and accessible.

**Flow:** type, blur, Zod checks, `errors` updates, message shows. On submit, Zod checks all fields. If valid, `onSubmit(data)` runs. If not, focus moves to the first bad field.

> Custom/controlled components (date pickers, shadcn Select, etc.) cannot take a `ref`, so use `<Controller>` or `useController` for them instead of `register`.

---

## Part 3: TanStack Query setup (`app/providers.tsx`, `app/layout.tsx`)

**Why:** Server data needs loading and error states, caching, deduplication, refetching and retries. Writing that by hand with `useEffect` + `useState` produces bugs (race conditions, no cache). TanStack Query handles all of it.

- **[Q1]** The provider uses context, so the file needs `"use client"`. `layout.tsx` stays a Server Component and simply wraps `{children}` in `<Providers>`.
- **[Q2]** Create the `QueryClient` inside `useState(() => ...)`. Creating it directly in the component body would make a **new client with an empty cache on every render**.
- **[Q3]** `staleTime`: how long data counts as fresh. The default `0` means "refetch whenever possible". 60s is a sensible starting point.
- **[Q4]** `retry`: the number of retries on failure (default 3).
- **[Q5]** Everything inside the provider can use `useQuery`.

---

## Part 4: `useQuery` (`app/demo/query/page.tsx`)

- **[U1]** It is a hook, so the file needs `"use client"`.
- **[U2]** Validate API data with Zod as well. If the API changes shape, you get a clear error instead of `undefined` crashes deep in the UI.
- **[U3]** `queryFn` is a plain async function that **throws on failure**.
- **[U4]** **Gotcha:** `fetch` does **not** throw on 404 or 500. Check `res.ok` yourself.
- **[U5]** `queryKey` is the **cache identity**. Include every variable the fetch depends on (`["posts", userId]`). When the key changes, the query refetches automatically.
- **[U6]** `queryFn` tells the query how to load the data.
- **[U7]** `enabled: false` pauses the query, for example until a user id exists (dependent queries).
- **[U8]** `refetch()` triggers a manual reload. `isFetching` is true during **any** fetch, including background ones.
- **[U9]** Always handle the states in this order: **pending, error, success**. After those two checks, TypeScript knows `data` is defined.
- **[U10]** `isPending` means there is no data yet for this key. Compare it with `isFetching` (a fetch is in flight, possibly with old data already on screen).
- **[U11]** Cache demo: click User 1, then 2, then 1 again. User 1 appears **instantly** from the cache.

| Flag | Meaning |
|---|---|
| `isPending` | no data yet |
| `isFetching` | request in flight (first or background) |
| `isError` / `error` | last fetch failed |
| `isSuccess` / `data` | have data |

---

## Exercises for students

1. Add a `phone` field: `z.string().regex(/^01\d{8,9}$/, "Malaysian mobile number")`.
2. Change `mode` to `"onChange"` and compare how it feels.
3. Add a `useQuery` for `https://jsonplaceholder.typicode.com/users/{userId}` and show the user's name above the posts.
4. Break the URL on purpose (`/postsXX`) and watch the error state and the retry ([Q4]).
5. Set `staleTime: 0` in providers and repeat [U11]. What changes?
6. Stretch goal: submit the form with `useMutation` to `POST https://jsonplaceholder.typicode.com/posts`.

---

## Other fixes made in this repo (lint/build errors from day 1)

- `app/layout.tsx`: `<SidebarProvider>` (a `<div>`) sat **outside** `<body>`, directly in `<html>`. That is invalid HTML and causes hydration errors. Moved it inside `<body>` and removed the stray `{" "}`.
- `modules/template/left-sidebar.tsx`: added the missing `key` in `.map()`, replaced `map(...)[0]` with `flatMap` (so every group shows), and removed the leftover `console.log`.
- `hooks/use-mobile.ts`: `setState` inside `useEffect` was flagged. Replaced it with `useSyncExternalStore`, the React-recommended way to subscribe to browser APIs.
- `type Props = {}` in several components: an empty-object type means "anything non-null". Removed it, because components with no props need no props type.
- Page components renamed `page` to `Page`. React components must start with a capital letter.
