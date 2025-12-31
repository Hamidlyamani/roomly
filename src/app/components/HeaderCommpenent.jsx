export default function HeaderCommpenent({ title, description, actionLabel, onAction, icon }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>

      <button
        onClick={onAction}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sec text-white text-sm font-medium hover:bg-prim shadow"
      >
        {icon}
        {actionLabel}
      </button>
    </div>
  );
}