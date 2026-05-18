export default function Placeholder({ children = "입력필요" }: { children?: string }) {
  return <span className="placeholder">[{children}]</span>;
}
