//
// Created by kozlo on 11/18/2023.
//

#include "GlFields.h"
#include <GLES2/gl2.h>

struct Field {
    std::string name;
    int value;
};


void GlFields::create(v8::Isolate *isolate,v8::Local<v8::Context> &context_local, v8::Local<v8::Object> &gl) {
    std::vector<Field> fields =
            {
                    {"UNPACK_PREMULTIPLY_ALPHA_WEBGL",               GL_NONE},
                    {"UNPACK_FLIP_Y_WEBGL",                          GL_NONE},
                    {"DEPTH_BUFFER_BIT",                             GL_DEPTH_BUFFER_BIT},
                    {"STENCIL_BUFFER_BIT",                           GL_STENCIL_BUFFER_BIT},
                    {"COLOR_BUFFER_BIT",                             GL_COLOR_BUFFER_BIT},
                    {"FALSE",                                        GL_FALSE},
                    {"TRUE",                                         GL_TRUE},
                    {"POINTS",                                       GL_POINTS},
                    {"LINES",                                        GL_LINES},
                    {"LINE_LOOP",                                    GL_LINE_LOOP},
                    {"LINE_STRIP",                                   GL_LINE_STRIP},
                    {"TRIANGLES",                                    GL_TRIANGLES},
                    {"TRIANGLE_STRIP",                               GL_TRIANGLE_STRIP},
                    {"TRIANGLE_FAN",                                 GL_TRIANGLE_FAN},
                    {"ZERO",                                         GL_ZERO},
                    {"ONE",                                          GL_ONE},
                    {"SRC_COLOR",                                    GL_SRC_COLOR},
                    {"ONE_MINUS_SRC_COLOR",                          GL_ONE_MINUS_SRC_COLOR},
                    {"SRC_ALPHA",                                    GL_SRC_ALPHA},
                    {"ONE_MINUS_SRC_ALPHA",                          GL_ONE_MINUS_SRC_ALPHA},
                    {"DST_ALPHA",                                    GL_DST_ALPHA},
                    {"ONE_MINUS_DST_ALPHA",                          GL_ONE_MINUS_DST_ALPHA},
                    {"DST_COLOR",                                    GL_DST_COLOR},
                    {"ONE_MINUS_DST_COLOR",                          GL_ONE_MINUS_DST_COLOR},
                    {"SRC_ALPHA_SATURATE",                           GL_SRC_ALPHA_SATURATE},
                    {"FUNC_ADD",                                     GL_FUNC_ADD},
                    {"BLEND_EQUATION",                               GL_BLEND_EQUATION},
                    {"BLEND_EQUATION_RGB",                           GL_BLEND_EQUATION_RGB},
                    {"BLEND_EQUATION_ALPHA",                         GL_BLEND_EQUATION_ALPHA},
                    {"FUNC_SUBTRACT",                                GL_FUNC_SUBTRACT},
                    {"FUNC_REVERSE_SUBTRACT",                        GL_FUNC_REVERSE_SUBTRACT},
                    {"BLEND_DST_RGB",                                GL_BLEND_DST_RGB},
                    {"BLEND_SRC_RGB",                                GL_BLEND_SRC_RGB},
                    {"BLEND_DST_ALPHA",                              GL_BLEND_DST_ALPHA},
                    {"BLEND_SRC_ALPHA",                              GL_BLEND_SRC_ALPHA},
                    {"CONSTANT_COLOR",                               GL_CONSTANT_COLOR},
                    {"ONE_MINUS_CONSTANT_COLOR",                     GL_ONE_MINUS_CONSTANT_COLOR},
                    {"CONSTANT_ALPHA",                               GL_CONSTANT_ALPHA},
                    {"ONE_MINUS_CONSTANT_ALPHA",                     GL_ONE_MINUS_CONSTANT_ALPHA},
                    {"BLEND_COLOR",                                  GL_BLEND_COLOR},
                    {"ARRAY_BUFFER",                                 GL_ARRAY_BUFFER},
                    {"ELEMENT_ARRAY_BUFFER",                         GL_ELEMENT_ARRAY_BUFFER},
                    {"ARRAY_BUFFER_BINDING",                         GL_ARRAY_BUFFER_BINDING},
                    {"ELEMENT_ARRAY_BUFFER_BINDING",                 GL_ELEMENT_ARRAY_BUFFER_BINDING},
                    {"STREAM_DRAW",                                  GL_STREAM_DRAW},
                    {"STATIC_DRAW",                                  GL_STATIC_DRAW},
                    {"DYNAMIC_DRAW",                                 GL_DYNAMIC_DRAW},
                    {"BUFFER_SIZE",                                  GL_BUFFER_SIZE},
                    {"BUFFER_USAGE",                                 GL_BUFFER_USAGE},
                    {"CURRENT_VERTEX_ATTRIB",                        GL_CURRENT_VERTEX_ATTRIB},
                    {"FRONT",                                        GL_FRONT},
                    {"BACK",                                         GL_BACK},
                    {"FRONT_AND_BACK",                               GL_FRONT_AND_BACK},
                    {"TEXTURE_2D",                                   GL_TEXTURE_2D},
                    {"CULL_FACE",                                    GL_CULL_FACE},
                    {"BLEND",                                        GL_BLEND},
                    {"DITHER",                                       GL_DITHER},
                    {"STENCIL_TEST",                                 GL_STENCIL_TEST},
                    {"DEPTH_TEST",                                   GL_DEPTH_TEST},
                    {"SCISSOR_TEST",                                 GL_SCISSOR_TEST},
                    {"POLYGON_OFFSET_FILL",                          GL_POLYGON_OFFSET_FILL},
                    {"SAMPLE_ALPHA_TO_COVERAGE",                     GL_SAMPLE_ALPHA_TO_COVERAGE},
                    {"SAMPLE_COVERAGE",                              GL_SAMPLE_COVERAGE},
                    {"NO_ERROR",                                     GL_NO_ERROR},
                    {"INVALID_ENUM",                                 GL_INVALID_ENUM},
                    {"INVALID_VALUE",                                GL_INVALID_VALUE},
                    {"INVALID_OPERATION",                            GL_INVALID_OPERATION},
                    {"OUT_OF_MEMORY",                                GL_OUT_OF_MEMORY},
                    {"CW",                                           GL_CW},
                    {"CCW",                                          GL_CCW},
                    {"LINE_WIDTH",                                   GL_LINE_WIDTH},
                    {"ALIASED_POINT_SIZE_RANGE",                     GL_ALIASED_POINT_SIZE_RANGE},
                    {"ALIASED_LINE_WIDTH_RANGE",                     GL_ALIASED_LINE_WIDTH_RANGE},
                    {"CULL_FACE_MODE",                               GL_CULL_FACE_MODE},
                    {"FRONT_FACE",                                   GL_FRONT_FACE},
                    {"DEPTH_RANGE",                                  GL_DEPTH_RANGE},
                    {"DEPTH_WRITEMASK",                              GL_DEPTH_WRITEMASK},
                    {"DEPTH_CLEAR_VALUE",                            GL_DEPTH_CLEAR_VALUE},
                    {"DEPTH_FUNC",                                   GL_DEPTH_FUNC},
                    {"STENCIL_CLEAR_VALUE",                          GL_STENCIL_CLEAR_VALUE},
                    {"STENCIL_FUNC",                                 GL_STENCIL_FUNC},
                    {"STENCIL_FAIL",                                 GL_STENCIL_FAIL},
                    {"STENCIL_PASS_DEPTH_FAIL",                      GL_STENCIL_PASS_DEPTH_FAIL},
                    {"STENCIL_PASS_DEPTH_PASS",                      GL_STENCIL_PASS_DEPTH_PASS},
                    {"STENCIL_REF",                                  GL_STENCIL_REF},
                    {"STENCIL_VALUE_MASK",                           GL_STENCIL_VALUE_MASK},
                    {"STENCIL_WRITEMASK",                            GL_STENCIL_WRITEMASK},
                    {"STENCIL_BACK_FUNC",                            GL_STENCIL_BACK_FUNC},
                    {"STENCIL_BACK_FAIL",                            GL_STENCIL_BACK_FAIL},
                    {"STENCIL_BACK_PASS_DEPTH_FAIL",                 GL_STENCIL_BACK_PASS_DEPTH_FAIL},
                    {"STENCIL_BACK_PASS_DEPTH_PASS",                 GL_STENCIL_BACK_PASS_DEPTH_PASS},
                    {"STENCIL_BACK_REF",                             GL_STENCIL_BACK_REF},
                    {"STENCIL_BACK_VALUE_MASK",                      GL_STENCIL_BACK_VALUE_MASK},
                    {"STENCIL_BACK_WRITEMASK",                       GL_STENCIL_BACK_WRITEMASK},
                    {"VIEWPORT",                                     GL_VIEWPORT},
                    {"SCISSOR_BOX",                                  GL_SCISSOR_BOX},
                    {"COLOR_CLEAR_VALUE",                            GL_COLOR_CLEAR_VALUE},
                    {"COLOR_WRITEMASK",                              GL_COLOR_WRITEMASK},
                    {"UNPACK_ALIGNMENT",                             GL_UNPACK_ALIGNMENT},
                    {"PACK_ALIGNMENT",                               GL_PACK_ALIGNMENT},
                    {"MAX_TEXTURE_SIZE",                             GL_MAX_TEXTURE_SIZE},
                    {"MAX_VIEWPORT_DIMS",                            GL_MAX_VIEWPORT_DIMS},
                    {"SUBPIXEL_BITS",                                GL_SUBPIXEL_BITS},
                    {"RED_BITS",                                     GL_RED_BITS},
                    {"GREEN_BITS",                                   GL_GREEN_BITS},
                    {"BLUE_BITS",                                    GL_BLUE_BITS},
                    {"ALPHA_BITS",                                   GL_ALPHA_BITS},
                    {"DEPTH_BITS",                                   GL_DEPTH_BITS},
                    {"STENCIL_BITS",                                 GL_STENCIL_BITS},
                    {"POLYGON_OFFSET_UNITS",                         GL_POLYGON_OFFSET_UNITS},
                    {"POLYGON_OFFSET_FACTOR",                        GL_POLYGON_OFFSET_FACTOR},
                    {"TEXTURE_BINDING_2D",                           GL_TEXTURE_BINDING_2D},
                    {"SAMPLE_BUFFERS",                               GL_SAMPLE_BUFFERS},
                    {"SAMPLES",                                      GL_SAMPLES},
                    {"SAMPLE_COVERAGE_VALUE",                        GL_SAMPLE_COVERAGE_VALUE},
                    {"SAMPLE_COVERAGE_INVERT",                       GL_SAMPLE_COVERAGE_INVERT},
                    {"NUM_COMPRESSED_TEXTURE_FORMATS",               GL_NUM_COMPRESSED_TEXTURE_FORMATS},
                    {"COMPRESSED_TEXTURE_FORMATS",                   GL_COMPRESSED_TEXTURE_FORMATS},
                    {"DONT_CARE",                                    GL_DONT_CARE},
                    {"FASTEST",                                      GL_FASTEST},
                    {"NICEST",                                       GL_NICEST},
                    {"GENERATE_MIPMAP_HINT",                         GL_GENERATE_MIPMAP_HINT},
                    {"BYTE",                                         GL_BYTE},
                    {"UNSIGNED_BYTE",                                GL_UNSIGNED_BYTE},
                    {"SHORT",                                        GL_SHORT},
                    {"UNSIGNED_SHORT",                               GL_UNSIGNED_SHORT},
                    {"INT",                                          GL_INT},
                    {"UNSIGNED_INT",                                 GL_UNSIGNED_INT},
                    {"FLOAT",                                        GL_FLOAT},
                    {"FIXED",                                        GL_FIXED},
                    {"DEPTH_COMPONENT",                              GL_DEPTH_COMPONENT},
                    {"ALPHA",                                        GL_ALPHA},
                    {"RGB",                                          GL_RGB},
                    {"RGBA",                                         GL_RGBA},
                    {"LUMINANCE",                                    GL_LUMINANCE},
                    {"LUMINANCE_ALPHA",                              GL_LUMINANCE_ALPHA},
                    {"UNSIGNED_SHORT_4_4_4_4",                       GL_UNSIGNED_SHORT_4_4_4_4},
                    {"UNSIGNED_SHORT_5_5_5_1",                       GL_UNSIGNED_SHORT_5_5_5_1},
                    {"UNSIGNED_SHORT_5_6_5",                         GL_UNSIGNED_SHORT_5_6_5},
                    {"FRAGMENT_SHADER",                              GL_FRAGMENT_SHADER},
                    {"VERTEX_SHADER",                                GL_VERTEX_SHADER},
                    {"MAX_VERTEX_ATTRIBS",                           GL_MAX_VERTEX_ATTRIBS},
                    {"MAX_VERTEX_UNIFORM_VECTORS",                   GL_MAX_VERTEX_UNIFORM_VECTORS},
                    {"MAX_VARYING_VECTORS",                          GL_MAX_VARYING_VECTORS},
                    {"MAX_COMBINED_TEXTURE_IMAGE_UNITS",             GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS},
                    {"MAX_VERTEX_TEXTURE_IMAGE_UNITS",               GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS},
                    {"MAX_TEXTURE_IMAGE_UNITS",                      GL_MAX_TEXTURE_IMAGE_UNITS},
                    {"MAX_FRAGMENT_UNIFORM_VECTORS",                 GL_MAX_FRAGMENT_UNIFORM_VECTORS},
                    {"SHADER_TYPE",                                  GL_SHADER_TYPE},
                    {"DELETE_STATUS",                                GL_DELETE_STATUS},
                    {"LINK_STATUS",                                  GL_LINK_STATUS},
                    {"VALIDATE_STATUS",                              GL_VALIDATE_STATUS},
                    {"ATTACHED_SHADERS",                             GL_ATTACHED_SHADERS},
                    {"ACTIVE_UNIFORMS",                              GL_ACTIVE_UNIFORMS},
                    {"ACTIVE_UNIFORM_MAX_LENGTH",                    GL_ACTIVE_UNIFORM_MAX_LENGTH},
                    {"ACTIVE_ATTRIBUTES",                            GL_ACTIVE_ATTRIBUTES},
                    {"ACTIVE_ATTRIBUTE_MAX_LENGTH",                  GL_ACTIVE_ATTRIBUTE_MAX_LENGTH},
                    {"SHADING_LANGUAGE_VERSION",                     GL_SHADING_LANGUAGE_VERSION},
                    {"CURRENT_PROGRAM",                              GL_CURRENT_PROGRAM},
                    {"NEVER",                                        GL_NEVER},
                    {"LESS",                                         GL_LESS},
                    {"EQUAL",                                        GL_EQUAL},
                    {"LEQUAL",                                       GL_LEQUAL},
                    {"GREATER",                                      GL_GREATER},
                    {"NOTEQUAL",                                     GL_NOTEQUAL},
                    {"GEQUAL",                                       GL_GEQUAL},
                    {"ALWAYS",                                       GL_ALWAYS},
                    {"KEEP",                                         GL_KEEP},
                    {"REPLACE",                                      GL_REPLACE},
                    {"INCR",                                         GL_INCR},
                    {"DECR",                                         GL_DECR},
                    {"INVERT",                                       GL_INVERT},
                    {"INCR_WRAP",                                    GL_INCR_WRAP},
                    {"DECR_WRAP",                                    GL_DECR_WRAP},
                    {"VENDOR",                                       GL_VENDOR},
                    {"RENDERER",                                     GL_RENDERER},
                    {"VERSION",                                      GL_VERSION},
                    {"EXTENSIONS",                                   GL_EXTENSIONS},
                    {"NEAREST",                                      GL_NEAREST},
                    {"LINEAR",                                       GL_LINEAR},
                    {"NEAREST_MIPMAP_NEAREST",                       GL_NEAREST_MIPMAP_NEAREST},
                    {"LINEAR_MIPMAP_NEAREST",                        GL_LINEAR_MIPMAP_NEAREST},
                    {"NEAREST_MIPMAP_LINEAR",                        GL_NEAREST_MIPMAP_LINEAR},
                    {"LINEAR_MIPMAP_LINEAR",                         GL_LINEAR_MIPMAP_LINEAR},
                    {"TEXTURE_MAG_FILTER",                           GL_TEXTURE_MAG_FILTER},
                    {"TEXTURE_MIN_FILTER",                           GL_TEXTURE_MIN_FILTER},
                    {"TEXTURE_WRAP_S",                               GL_TEXTURE_WRAP_S},
                    {"TEXTURE_WRAP_T",                               GL_TEXTURE_WRAP_T},
                    {"TEXTURE",                                      GL_TEXTURE},
                    {"TEXTURE_CUBE_MAP",                             GL_TEXTURE_CUBE_MAP},
                    {"TEXTURE_BINDING_CUBE_MAP",                     GL_TEXTURE_BINDING_CUBE_MAP},
                    {"TEXTURE_CUBE_MAP_POSITIVE_X",                  GL_TEXTURE_CUBE_MAP_POSITIVE_X},
                    {"TEXTURE_CUBE_MAP_NEGATIVE_X",                  GL_TEXTURE_CUBE_MAP_NEGATIVE_X},
                    {"TEXTURE_CUBE_MAP_POSITIVE_Y",                  GL_TEXTURE_CUBE_MAP_POSITIVE_Y},
                    {"TEXTURE_CUBE_MAP_NEGATIVE_Y",                  GL_TEXTURE_CUBE_MAP_NEGATIVE_Y},
                    {"TEXTURE_CUBE_MAP_POSITIVE_Z",                  GL_TEXTURE_CUBE_MAP_POSITIVE_Z},
                    {"TEXTURE_CUBE_MAP_NEGATIVE_Z",                  GL_TEXTURE_CUBE_MAP_NEGATIVE_Z},
                    {"MAX_CUBE_MAP_TEXTURE_SIZE",                    GL_MAX_CUBE_MAP_TEXTURE_SIZE},
                    {"TEXTURE0",                                     GL_TEXTURE0},
                    {"TEXTURE1",                                     GL_TEXTURE1},
                    {"TEXTURE2",                                     GL_TEXTURE2},
                    {"TEXTURE3",                                     GL_TEXTURE3},
                    {"TEXTURE4",                                     GL_TEXTURE4},
                    {"TEXTURE5",                                     GL_TEXTURE5},
                    {"TEXTURE6",                                     GL_TEXTURE6},
                    {"TEXTURE7",                                     GL_TEXTURE7},
                    {"TEXTURE8",                                     GL_TEXTURE8},
                    {"TEXTURE9",                                     GL_TEXTURE9},
                    {"TEXTURE10",                                    GL_TEXTURE10},
                    {"TEXTURE11",                                    GL_TEXTURE11},
                    {"TEXTURE12",                                    GL_TEXTURE12},
                    {"TEXTURE13",                                    GL_TEXTURE13},
                    {"TEXTURE14",                                    GL_TEXTURE14},
                    {"TEXTURE15",                                    GL_TEXTURE15},
                    {"TEXTURE16",                                    GL_TEXTURE16},
                    {"TEXTURE17",                                    GL_TEXTURE17},
                    {"TEXTURE18",                                    GL_TEXTURE18},
                    {"TEXTURE19",                                    GL_TEXTURE19},
                    {"TEXTURE20",                                    GL_TEXTURE20},
                    {"TEXTURE21",                                    GL_TEXTURE21},
                    {"TEXTURE22",                                    GL_TEXTURE22},
                    {"TEXTURE23",                                    GL_TEXTURE23},
                    {"TEXTURE24",                                    GL_TEXTURE24},
                    {"TEXTURE25",                                    GL_TEXTURE25},
                    {"TEXTURE26",                                    GL_TEXTURE26},
                    {"TEXTURE27",                                    GL_TEXTURE27},
                    {"TEXTURE28",                                    GL_TEXTURE28},
                    {"TEXTURE29",                                    GL_TEXTURE29},
                    {"TEXTURE30",                                    GL_TEXTURE30},
                    {"TEXTURE31",                                    GL_TEXTURE31},
                    {"ACTIVE_TEXTURE",                               GL_ACTIVE_TEXTURE},
                    {"REPEAT",                                       GL_REPEAT},
                    {"CLAMP_TO_EDGE",                                GL_CLAMP_TO_EDGE},
                    {"MIRRORED_REPEAT",                              GL_MIRRORED_REPEAT},
                    {"FLOAT_VEC2",                                   GL_FLOAT_VEC2},
                    {"FLOAT_VEC3",                                   GL_FLOAT_VEC3},
                    {"FLOAT_VEC4",                                   GL_FLOAT_VEC4},
                    {"INT_VEC2",                                     GL_INT_VEC2},
                    {"INT_VEC3",                                     GL_INT_VEC3},
                    {"INT_VEC4",                                     GL_INT_VEC4},
                    {"BOOL",                                         GL_BOOL},
                    {"BOOL_VEC2",                                    GL_BOOL_VEC2},
                    {"BOOL_VEC3",                                    GL_BOOL_VEC3},
                    {"BOOL_VEC4",                                    GL_BOOL_VEC4},
                    {"FLOAT_MAT2",                                   GL_FLOAT_MAT2},
                    {"FLOAT_MAT3",                                   GL_FLOAT_MAT3},
                    {"FLOAT_MAT4",                                   GL_FLOAT_MAT4},
                    {"SAMPLER_2D",                                   GL_SAMPLER_2D},
                    {"SAMPLER_CUBE",                                 GL_SAMPLER_CUBE},
                    {"VERTEX_ATTRIB_ARRAY_ENABLED",                  GL_VERTEX_ATTRIB_ARRAY_ENABLED},
                    {"VERTEX_ATTRIB_ARRAY_SIZE",                     GL_VERTEX_ATTRIB_ARRAY_SIZE},
                    {"VERTEX_ATTRIB_ARRAY_STRIDE",                   GL_VERTEX_ATTRIB_ARRAY_STRIDE},
                    {"VERTEX_ATTRIB_ARRAY_TYPE",                     GL_VERTEX_ATTRIB_ARRAY_TYPE},
                    {"VERTEX_ATTRIB_ARRAY_NORMALIZED",               GL_VERTEX_ATTRIB_ARRAY_NORMALIZED},
                    {"VERTEX_ATTRIB_ARRAY_POINTER",                  GL_VERTEX_ATTRIB_ARRAY_POINTER},
                    {"VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",           GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING},
                    {"IMPLEMENTATION_COLOR_READ_TYPE",               GL_IMPLEMENTATION_COLOR_READ_TYPE},
                    {"IMPLEMENTATION_COLOR_READ_FORMAT",             GL_IMPLEMENTATION_COLOR_READ_FORMAT},
                    {"COMPILE_STATUS",                               GL_COMPILE_STATUS},
                    {"INFO_LOG_LENGTH",                              GL_INFO_LOG_LENGTH},
                    {"SHADER_SOURCE_LENGTH",                         GL_SHADER_SOURCE_LENGTH},
                    {"SHADER_COMPILER",                              GL_SHADER_COMPILER},
                    {"SHADER_BINARY_FORMATS",                        GL_SHADER_BINARY_FORMATS},
                    {"NUM_SHADER_BINARY_FORMATS",                    GL_NUM_SHADER_BINARY_FORMATS},
                    {"LOW_FLOAT",                                    GL_LOW_FLOAT},
                    {"MEDIUM_FLOAT",                                 GL_MEDIUM_FLOAT},
                    {"HIGH_FLOAT",                                   GL_HIGH_FLOAT},
                    {"LOW_INT",                                      GL_LOW_INT},
                    {"MEDIUM_INT",                                   GL_MEDIUM_INT},
                    {"HIGH_INT",                                     GL_HIGH_INT},
                    {"FRAMEBUFFER",                                  GL_FRAMEBUFFER},
                    {"RENDERBUFFER",                                 GL_RENDERBUFFER},
                    {"RGBA4",                                        GL_RGBA4},
                    {"RGB5_A1",                                      GL_RGB5_A1},
                    {"RGB565",                                       GL_RGB565},
                    {"DEPTH_COMPONENT16",                            GL_DEPTH_COMPONENT16},
                    {"STENCIL_INDEX8",                               GL_STENCIL_INDEX8},
                    {"RENDERBUFFER_WIDTH",                           GL_RENDERBUFFER_WIDTH},
                    {"RENDERBUFFER_HEIGHT",                          GL_RENDERBUFFER_HEIGHT},
                    {"RENDERBUFFER_INTERNAL_FORMAT",                 GL_RENDERBUFFER_INTERNAL_FORMAT},
                    {"RENDERBUFFER_RED_SIZE",                        GL_RENDERBUFFER_RED_SIZE},
                    {"RENDERBUFFER_GREEN_SIZE",                      GL_RENDERBUFFER_GREEN_SIZE},
                    {"RENDERBUFFER_BLUE_SIZE",                       GL_RENDERBUFFER_BLUE_SIZE},
                    {"RENDERBUFFER_ALPHA_SIZE",                      GL_RENDERBUFFER_ALPHA_SIZE},
                    {"RENDERBUFFER_DEPTH_SIZE",                      GL_RENDERBUFFER_DEPTH_SIZE},
                    {"RENDERBUFFER_STENCIL_SIZE",                    GL_RENDERBUFFER_STENCIL_SIZE},
                    {"FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",           GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE},
                    {"FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",           GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME},
                    {"FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",         GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL},
                    {"FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE", GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE},
                    {"COLOR_ATTACHMENT0",                            GL_COLOR_ATTACHMENT0},
                    {"DEPTH_ATTACHMENT",                             GL_DEPTH_ATTACHMENT},
                    {"STENCIL_ATTACHMENT",                           GL_STENCIL_ATTACHMENT},
                    {"NONE",                                         GL_NONE},
                    {"FRAMEBUFFER_COMPLETE",                         GL_FRAMEBUFFER_COMPLETE},
                    {"FRAMEBUFFER_INCOMPLETE_ATTACHMENT",            GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT},
                    {"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",    GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT},
                    {"FRAMEBUFFER_INCOMPLETE_DIMENSIONS",            GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS},
                    {"FRAMEBUFFER_UNSUPPORTED",                      GL_FRAMEBUFFER_UNSUPPORTED},
                    {"FRAMEBUFFER_BINDING",                          GL_FRAMEBUFFER_BINDING},
                    {"RENDERBUFFER_BINDING",                         GL_RENDERBUFFER_BINDING},
                    {"MAX_RENDERBUFFER_SIZE",                        GL_MAX_RENDERBUFFER_SIZE},
                    {"INVALID_FRAMEBUFFER_OPERATION",                GL_INVALID_FRAMEBUFFER_OPERATION},
                    {"STENCIL_INDEX",                                0x1901},

            };
    for(const Field& f : fields) {
        gl->Set(
                context_local,
                v8::String::NewFromUtf8(isolate, f.name.c_str()).ToLocalChecked(),
                v8::Integer::NewFromUnsigned(isolate, f.value)
        ).Check();
    }
}
