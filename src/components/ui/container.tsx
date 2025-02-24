type Container = {
  children?: React.ReactNode;
}

export function Container({ children }: Container) {
  return (
    <div className="max-w[1280px]">{children}</div>
  );
}
