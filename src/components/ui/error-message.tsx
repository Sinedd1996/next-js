export function ErrorMessage() {
  const error = "message example";
  return error ? <div className="text-red">{error}</div> : null;
}
