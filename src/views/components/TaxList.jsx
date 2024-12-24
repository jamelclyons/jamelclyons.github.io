function TaxList(props) {
  const { tax, title } = props;

  const handleClick = (taxonomy) => {
    window.location.href = `/#/projects/${taxonomy.path}/${taxonomy.id}`;
  };

  return (
    Array.isArray(tax) && (
      <div className="tax-list">
        <h4 className="title">{title}</h4>

        <div className="tax-row">
          {tax.map((taxonomy, index) =>
            taxonomy && taxonomy.title ? (
              <button
                key={index}
                className="tag"
                onClick={() => handleClick(taxonomy)}>
                <h3>{taxonomy.title}</h3>
              </button>
            ) : null
          )}
        </div>
      </div>
    )
  );
}

export default TaxList;
