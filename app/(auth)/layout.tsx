interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(svg/blue-blog.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <div className="px-4 sm:px-0 sm:container h-screen">{children}</div>
    </div>
  );
}
