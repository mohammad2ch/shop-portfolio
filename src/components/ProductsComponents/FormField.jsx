const FormField = ({ label, error, hint, children }) => {
  return (
    <label className="block text-start">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-sm text-red-500">{error}</span>
      ) : (
        hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>
      )}
    </label>
  );
};

export default FormField;