import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { confirmAccount } from '../api/v1/functions';
import { Title, Alert } from '../components';

export const ConfirmAccount = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (id) {
      return async () => {
        await confirmAccount(id).then(({ error, msg }) => {
          if (error) {
            setMessage(msg);
            setIsError(true);
          } else {
            setMessage(msg);
            setConfirmed(true);
          }
        });
        setLoading(false);
      };
    }
  }, [id]);

  return (
    <>
      <div>
        <Title
          mainText="Confirma tu Cuenta y Comienza a Administrar"
          subText="tus Pacientes"
        />
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!loading && isError ? (
          <Alert message={message} error={true} />
        ) : (
          <Alert message={message} error={false} />
        )}
        {confirmed && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};
