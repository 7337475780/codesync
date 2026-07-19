export function AuthDivider({ text = "OR" }: { text?: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/[0.08]"></div>
      </div>
      <div className="relative flex justify-center text-[12px] font-medium uppercase tracking-wider">
        <span className="bg-[#0a0a0a] px-3 text-gray-500">{text}</span>
      </div>
    </div>
  );
}
