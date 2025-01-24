function Footer() {
  let date = new Date();
  let image: string[] = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzxh4zvS-fdwiwfO7XfzRrlyTRFfRUFK1S1Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpzjdk41W8mtJnZs2VO2-L6pEJ8iEzvqw9-w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHZbtul1H2kX9QhSuffNtP5J40yQqO1ifbcg&s"
  ];
  return (
    <div className="footer">
      <div className="cards">
      {image?.map((element, index)=>{
        return <img src={element} alt="cards-image" key={index} />})}
      </div>
      <footer>
        <h3>
          @copyright{date.getFullYear()}
          <p>All copyrights are reserved by Debottam Kar {date.toLocaleDateString()}</p>
        </h3>
      </footer>
    </div>
  );
}

export default Footer;
