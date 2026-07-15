const Saturn = () => {
  return (
    <div className="relative h-37.5 w-37.5 rounded-full overflow-hidden select-none bg-linear-to-r from-white/30 to-transparent shadow-[inset_10px_0_12px_-2px_rgba(255,255,255,0.35),inset_-70px_0_50px_0_#000000,0_0_15px_-4px_#f0e2c4]">
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1] rotate-[26.7deg] scale-[1.2] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/saturn.jpg')] animate-[planetRotate_1.07s_linear_infinite]"
      />
    </div>
  );
};

export default Saturn;
