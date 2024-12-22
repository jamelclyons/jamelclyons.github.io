import CheckList from './CheckList';
import Colors from './Colors';
import Gallery from './Gallery';
import ContentComponent from './ContentComponent';

function Design(props) {
  const { design } = props;

  return (
    <>
      <div className="project-process-design" id="project_process_design">
        <h4 class="title">design</h4>

        <CheckList checklist={design.checkList} />

        <Colors colors={design.colorsList} />

        <Gallery title={'Logos'} gallery={design.gallery.logos} />

        <Gallery title={'icons'} gallery={design.gallery.icons} />

        <Gallery title={'animations'} gallery={design.gallery.animations} />

        <Gallery title={'uml diagrams'} gallery={design.gallery.umlDiagrams} />

        <ContentComponent content={design.content} />
      </div>
    </>
  );
}

export default Design;
