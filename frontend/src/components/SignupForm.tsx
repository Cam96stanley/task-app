interface SignupFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
}

export default function SignupForm({
  formData,
  onChange,
  onSubmit,
  error,
}: SignupFormProps) {
  return (
    <form className="mt-12" onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={onChange}
        required
        className="block w-full p-2 border mb-4"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={onChange}
        required
        className="block w-full p-2 border mb-4"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={onChange}
        required
        className="block w-full p-2 border mb-4"
      />
      {error && <p>{error}</p>}
      <button
        type="submit"
        className="!bg-gray-500 px-4 py-2 rounded-2xl transition-transform duration-150 ease-in-out hover:translate-y-1 hover:scale-95 hover:font-semibold cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  );
}
