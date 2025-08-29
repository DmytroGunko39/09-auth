'use client';

interface ErrorMessageProps {
  error: Error;
}

const ErrorMessageId = ({ error }: ErrorMessageProps) => {
  return <p>Could not fetch note details. {error.message}</p>;
};

export default ErrorMessageId;
