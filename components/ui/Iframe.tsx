function Iframe({ src }: { src: string }) {
  if (!src) {
    return <></>
  }

  return (
    <iframe
      data-testid="youtube-player"
      className="vtex-list-context-0-x-videoElement vtex-list-context-0-x-videoElement--lp-ecoplus"
      src={src}
      allow="autoplay"
      allowFullScreen
      id="362950329"
      title="Conheça os Ares-Condicionados Electrolux EcoPlus"
      width={'100%'}
      height={537}
      style={{ border: 'none' }}
    ></iframe>
  );
}

export default Iframe;