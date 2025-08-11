import Icon from "../Icon";

interface FormSucessProps {
  message: string;
}

const FormSucess = ({ message }: FormSucessProps) => {
  return (
    <div className="bg-emerald-500/15 text-emerald-500 p-3 rounded-md flex items-center gap-x-2 text-sm">
      <Icon name="checkCircle" className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSucess;