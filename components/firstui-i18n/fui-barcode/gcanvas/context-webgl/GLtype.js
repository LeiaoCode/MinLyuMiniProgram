// 本文件由FirstUI授权予向*磊（会员ID：  37 89）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
const GLtype = {};

[
    "GLbitfield",
    "GLboolean",
    "GLbyte",
    "GLclampf",
    "GLenum",
    "GLfloat",
    "GLint",
    "GLintptr",
    "GLsizei",
    "GLsizeiptr",
    "GLshort",
    "GLubyte",
    "GLuint",
    "GLushort"
].sort().map((typeName, i) => GLtype[typeName] = 1 >> (i + 1));

export default GLtype;


