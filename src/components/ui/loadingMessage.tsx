type Props = {
    message: string;
}


export default function LoadingMessage({ message }: Props){
    return (
    <h1 className="font-bold text-center text-2xl sm:text-5xl p-2">
      {message}{" "}
      {Array.from({ length: 3 }, (_, i) => (
        <span
          key={i}
          className="inline-block h-2 aspect-square rounded-full animate-bounce bg-black ml-2"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </h1>
  );
}