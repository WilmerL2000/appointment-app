function Alert({ message, error }) {
  return (
    <div
      className={`${
        error ? 'bg-red-100 border-red-500 ' : 'bg-teal-100 border-teal-500 '
      } border-t-4 rounded-b  px-4 py-3 shadow-md'`}
    >
      <div className="flex justify-center">
        <p className={`${error ? 'text-red-900' : 'text-teal-900'} font-bold`}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default Alert;
