import { useField } from 'formik';

function InputPassword({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="uppercase block text-lg text-gray-600 font-bold">
        {label}
      </label>
      <input
        type="password"
        className={`${
          meta.touched && meta.error
            ? 'border border-red-500 '
            : 'border border-blue-400'
        }
				  w-full bg-gray-200 p-3 mt-3 rounded-lg focus:outline-none hover:ring-1 focus:ring-2 
         `}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </>
  );
}

export default InputPassword;
