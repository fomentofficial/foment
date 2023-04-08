function renderEditPage(req, res) {
    const detaildata = {
      pageTitle: 'Edit Invitation',
      message: 'Please edit the invitation details'
    };
    res.render('detail', detaildata || {});
    console.log('수정파일 생성됨');
  }
  
  module.exports = {
    renderEditPage,
  };
  