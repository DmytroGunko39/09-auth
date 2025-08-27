'use client';

interface ErrorMessageProps {
  error: Error;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <p>Could not fetch the list of notes. {error.message}</p>;
};

export default ErrorMessage;
