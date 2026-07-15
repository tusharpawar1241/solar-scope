const Sun = () => {
  return (
    <div className="relative h-37.5 w-37.5 rounded-full overflow-hidden select-none bg-linear-to-r from-white/30 to-transparent shadow-[0_0_10px_0_#cc9f4c,0_0_1000px_-2px_#cc9f4c]">
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1] rotate-0 scale-[1.2] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/sun.jpg')] animate-[planetRotate_60s_linear_infinite]"
      />
    </div>
  );
};

export default Sun;
