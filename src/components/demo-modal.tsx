type DemoModalProps = {
  isOpen?: () => void;
  children: React.ReactNode;
};

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-100 flex h-screen w-full items-center justify-center bg-gray-800 bg-opacity-50 p-1 lg:p-4">
      <div className="w-full p-4 max-w-[800px]">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default DemoModal;
