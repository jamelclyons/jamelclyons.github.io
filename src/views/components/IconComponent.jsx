function IconComponent(props) {
  const { icon, type } = props;

  if (!(icon instanceof Object)) return null;

  return (
    <div className="icon">
      <a href={`#/projects/${icon.type ?? type}/${icon.id}`}>
        {icon.icon_url ? (
          <img src={icon.icon_url} alt={icon.title} title={icon.title} />
        ) : (
          icon.class_name && (
            <i className={icon.class_name} title={icon.title}></i>
          )
        )}
      </a>
    </div>
  );
}

export default IconComponent;
