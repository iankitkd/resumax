import Icon from "../Icon";

interface FormErrorProps {
  message: string;
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="bg-danger/20 text-danger p-3 rounded-md flex items-center gap-x-2 text-sm">
      <Icon name="exclamationTriangle" className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;