function IconComponent({ icon }) {
  if (!(icon instanceof Object)) return null;

  return (
    <div className="icon">
      <a href={icon.url || "#"}>
        {icon.icon_url ? (
          <img src={icon.icon_url} alt="icon" />
        ) : (
          icon.class_name && <i className={icon.class_name}></i>
        )}
      </a>
    </div>
  );
}

export default IconComponent;
