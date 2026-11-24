// A labelled form control with an error message and optional hint.
// Renders an <input> by default. Pass as="select" or as="textarea" for those.
// Reusable across the auth and add-property forms.
export default function FormField({
  id,
  label,
  error,
  hint,
  trailing,
  as: Component = 'input',
  ...fieldProps
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>

      <div className="relative">
        <Component
          id={id}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-2 focus:outline-brand ${
            error ? 'border-red-500' : 'border-line'
          } ${trailing ? 'pr-16' : ''}`}
          {...fieldProps}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-4 flex items-center">{trailing}</div>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
