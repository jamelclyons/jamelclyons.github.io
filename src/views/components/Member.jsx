function Member(props) {
  const { url, email } = props;
console.log(email);
  return (
    <>
      <div className="member-card card">
        <div className="member-pic">
          <img src={url} alt="" />
        </div>

        <div className="role">
          <h5>Designer Software Development Engineer</h5>
        </div>

        <div className="member-contact">
            <a href={`mailto:${email}`}>
              <i className="fa fa-envelope fa-fw"></i>
            </a>
          </div>
      </div>
    </>
  );
}

export default Member;
