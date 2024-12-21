import { useSelector } from 'react-redux';

function Design() {
  const {
    design,
    design_gallery,
    design_check_list,
    colors,
    logos_gallery,
    icons_gallery,
    animations_gallery,
    uml_diagrams_gallery,
  } = useSelector((state) => state.portfolio);

  return (
    <>
      {design_check_list ||
      (design_gallery && design_gallery.length > 0) ||
      colors ||
      (logos_gallery && logos_gallery.length > 0) ||
      (icons_gallery && icons_gallery.length > 0) ||
      (animations_gallery && animations_gallery.length > 0) ||
      (uml_diagrams_gallery && uml_diagrams_gallery.length > 0) ||
      design ? (
        <div className="project-process-design" id="project_process_design">
          <h4 class="title">DESIGN</h4>

          <CheckList checklist={design_check_list} />

          <Gallery gallery={design_gallery} />

          <Colors colors={colors} />

          <Gallery title={'Logos'} gallery={logos_gallery} />

          <Gallery title={'icons'} gallery={icons_gallery} />

          <Gallery title={'animations'} gallery={animations_gallery} />

          <Gallery title={'uml diagrams'} gallery={uml_diagrams_gallery} />

          <Card text={design} />
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Design;
