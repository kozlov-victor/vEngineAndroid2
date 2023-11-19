//
// Created by kozlo on 11/18/2023.
//

#include "GlFields.h"
#include "app/globals/globals.h"
#include <GLES2/gl2.h>

void GlFields::create(v8::Local<v8::Context> &context_local, v8::Local<v8::Object> &gl) {
    gl->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "COLOR_BUFFER_BIT").ToLocalChecked(),
        v8::Number::New(isolate, GL_COLOR_BUFFER_BIT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "UNPACK_PREMULTIPLY_ALPHA_WEBGL").ToLocalChecked(),
            v8::Number::New(isolate, -1)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "UNPACK_FLIP_Y_WEBGL").ToLocalChecked(),
            v8::Number::New(isolate, -1)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STATIC_DRAW").ToLocalChecked(),
            v8::Number::New(isolate, GL_STATIC_DRAW)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DYNAMIC_DRAW").ToLocalChecked(),
            v8::Number::New(isolate, GL_DYNAMIC_DRAW)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ACTIVE_TEXTURE").ToLocalChecked(),
            v8::Number::New(isolate, GL_ACTIVE_TEXTURE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_BUFFER_BIT").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_BUFFER_BIT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_BUFFER_BIT").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_BUFFER_BIT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "COLOR_BUFFER_BIT").ToLocalChecked(),
            v8::Number::New(isolate, GL_COLOR_BUFFER_BIT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FALSE").ToLocalChecked(),
            v8::Number::New(isolate, GL_FALSE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TRUE").ToLocalChecked(),
            v8::Number::New(isolate, GL_TRUE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "POINTS").ToLocalChecked(),
            v8::Number::New(isolate, GL_POINTS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LINES").ToLocalChecked(),
            v8::Number::New(isolate, GL_LINES)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LINE_LOOP").ToLocalChecked(),
            v8::Number::New(isolate, GL_LINE_LOOP)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LINE_STRIP").ToLocalChecked(),
            v8::Number::New(isolate, GL_LINE_STRIP)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TRIANGLES").ToLocalChecked(),
            v8::Number::New(isolate, GL_TRIANGLES)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TRIANGLE_STRIP").ToLocalChecked(),
            v8::Number::New(isolate, GL_TRIANGLE_STRIP)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TRIANGLE_FAN").ToLocalChecked(),
            v8::Number::New(isolate, GL_TRIANGLE_FAN)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ZERO").ToLocalChecked(),
            v8::Number::New(isolate, GL_ZERO)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ONE").ToLocalChecked(),
            v8::Number::New(isolate, GL_ONE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SRC_COLOR").ToLocalChecked(),
            v8::Number::New(isolate, GL_SRC_COLOR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ONE_MINUS_SRC_COLOR").ToLocalChecked(),
            v8::Number::New(isolate, GL_ONE_MINUS_SRC_COLOR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SRC_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_SRC_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ONE_MINUS_SRC_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_ONE_MINUS_SRC_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DST_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_DST_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ONE_MINUS_DST_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_ONE_MINUS_DST_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DST_COLOR").ToLocalChecked(),
            v8::Number::New(isolate, GL_DST_COLOR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ONE_MINUS_DST_COLOR").ToLocalChecked(),
            v8::Number::New(isolate, GL_ONE_MINUS_DST_COLOR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SRC_ALPHA_SATURATE").ToLocalChecked(),
            v8::Number::New(isolate, GL_SRC_ALPHA_SATURATE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FUNC_ADD").ToLocalChecked(),
            v8::Number::New(isolate, GL_FUNC_ADD)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLEND_EQUATION").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLEND_EQUATION)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLEND_EQUATION_RGB").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLEND_EQUATION_RGB)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLEND_EQUATION_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLEND_EQUATION_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FUNC_SUBTRACT").ToLocalChecked(),
            v8::Number::New(isolate, GL_FUNC_SUBTRACT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FUNC_REVERSE_SUBTRACT").ToLocalChecked(),
            v8::Number::New(isolate, GL_FUNC_REVERSE_SUBTRACT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLEND_DST_RGB").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLEND_DST_RGB)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLEND_SRC_RGB").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLEND_SRC_RGB)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLEND_DST_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLEND_DST_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLEND_SRC_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLEND_SRC_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "CONSTANT_COLOR").ToLocalChecked(),
            v8::Number::New(isolate, GL_CONSTANT_COLOR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ONE_MINUS_CONSTANT_COLOR").ToLocalChecked(),
            v8::Number::New(isolate, GL_ONE_MINUS_CONSTANT_COLOR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "CONSTANT_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_CONSTANT_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ONE_MINUS_CONSTANT_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_ONE_MINUS_CONSTANT_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLEND_COLOR").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLEND_COLOR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ARRAY_BUFFER").ToLocalChecked(),
            v8::Number::New(isolate, GL_ARRAY_BUFFER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ELEMENT_ARRAY_BUFFER").ToLocalChecked(),
            v8::Number::New(isolate, GL_ELEMENT_ARRAY_BUFFER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ARRAY_BUFFER_BINDING").ToLocalChecked(),
            v8::Number::New(isolate, GL_ARRAY_BUFFER_BINDING)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ELEMENT_ARRAY_BUFFER_BINDING").ToLocalChecked(),
            v8::Number::New(isolate, GL_ELEMENT_ARRAY_BUFFER_BINDING)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STREAM_DRAW").ToLocalChecked(),
            v8::Number::New(isolate, GL_STREAM_DRAW)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BUFFER_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_BUFFER_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BUFFER_USAGE").ToLocalChecked(),
            v8::Number::New(isolate, GL_BUFFER_USAGE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "CURRENT_VERTEX_ATTRIB").ToLocalChecked(),
            v8::Number::New(isolate, GL_CURRENT_VERTEX_ATTRIB)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRONT").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRONT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BACK").ToLocalChecked(),
            v8::Number::New(isolate, GL_BACK)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRONT_AND_BACK").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRONT_AND_BACK)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_2D").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_2D)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "CULL_FACE").ToLocalChecked(),
            v8::Number::New(isolate, GL_CULL_FACE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLEND").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLEND)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DITHER").ToLocalChecked(),
            v8::Number::New(isolate, GL_DITHER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_TEST").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_TEST)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_TEST").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_TEST)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SCISSOR_TEST").ToLocalChecked(),
            v8::Number::New(isolate, GL_SCISSOR_TEST)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "POLYGON_OFFSET_FILL").ToLocalChecked(),
            v8::Number::New(isolate, GL_POLYGON_OFFSET_FILL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SAMPLE_ALPHA_TO_COVERAGE").ToLocalChecked(),
            v8::Number::New(isolate, GL_SAMPLE_ALPHA_TO_COVERAGE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SAMPLE_COVERAGE").ToLocalChecked(),
            v8::Number::New(isolate, GL_SAMPLE_COVERAGE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NO_ERROR").ToLocalChecked(),
            v8::Number::New(isolate, GL_NO_ERROR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INVALID_ENUM").ToLocalChecked(),
            v8::Number::New(isolate, GL_INVALID_ENUM)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INVALID_VALUE").ToLocalChecked(),
            v8::Number::New(isolate, GL_INVALID_VALUE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INVALID_OPERATION").ToLocalChecked(),
            v8::Number::New(isolate, GL_INVALID_OPERATION)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "OUT_OF_MEMORY").ToLocalChecked(),
            v8::Number::New(isolate, GL_OUT_OF_MEMORY)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "CW").ToLocalChecked(),
            v8::Number::New(isolate, GL_CW)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "CCW").ToLocalChecked(),
            v8::Number::New(isolate, GL_CCW)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LINE_WIDTH").ToLocalChecked(),
            v8::Number::New(isolate, GL_LINE_WIDTH)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ALIASED_POINT_SIZE_RANGE").ToLocalChecked(),
            v8::Number::New(isolate, GL_ALIASED_POINT_SIZE_RANGE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ALIASED_LINE_WIDTH_RANGE").ToLocalChecked(),
            v8::Number::New(isolate, GL_ALIASED_LINE_WIDTH_RANGE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "CULL_FACE_MODE").ToLocalChecked(),
            v8::Number::New(isolate, GL_CULL_FACE_MODE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRONT_FACE").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRONT_FACE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_RANGE").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_RANGE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_WRITEMASK").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_WRITEMASK)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_CLEAR_VALUE").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_CLEAR_VALUE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_FUNC").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_FUNC)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_CLEAR_VALUE").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_CLEAR_VALUE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_FUNC").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_FUNC)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_FAIL").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_FAIL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_PASS_DEPTH_FAIL").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_PASS_DEPTH_FAIL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_PASS_DEPTH_PASS").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_PASS_DEPTH_PASS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_REF").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_REF)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_VALUE_MASK").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_VALUE_MASK)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_WRITEMASK").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_WRITEMASK)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_BACK_FUNC").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_BACK_FUNC)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_BACK_FAIL").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_BACK_FAIL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_BACK_PASS_DEPTH_FAIL").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_BACK_PASS_DEPTH_FAIL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_BACK_PASS_DEPTH_PASS").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_BACK_PASS_DEPTH_PASS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_BACK_REF").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_BACK_REF)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_BACK_VALUE_MASK").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_BACK_VALUE_MASK)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_BACK_WRITEMASK").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_BACK_WRITEMASK)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VIEWPORT").ToLocalChecked(),
            v8::Number::New(isolate, GL_VIEWPORT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SCISSOR_BOX").ToLocalChecked(),
            v8::Number::New(isolate, GL_SCISSOR_BOX)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "COLOR_CLEAR_VALUE").ToLocalChecked(),
            v8::Number::New(isolate, GL_COLOR_CLEAR_VALUE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "COLOR_WRITEMASK").ToLocalChecked(),
            v8::Number::New(isolate, GL_COLOR_WRITEMASK)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "UNPACK_ALIGNMENT").ToLocalChecked(),
            v8::Number::New(isolate, GL_UNPACK_ALIGNMENT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "PACK_ALIGNMENT").ToLocalChecked(),
            v8::Number::New(isolate, GL_PACK_ALIGNMENT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_TEXTURE_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_TEXTURE_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_VIEWPORT_DIMS").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_VIEWPORT_DIMS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SUBPIXEL_BITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_SUBPIXEL_BITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RED_BITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_RED_BITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "GREEN_BITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_GREEN_BITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BLUE_BITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_BLUE_BITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ALPHA_BITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_ALPHA_BITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_BITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_BITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_BITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_BITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "POLYGON_OFFSET_UNITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_POLYGON_OFFSET_UNITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "POLYGON_OFFSET_FACTOR").ToLocalChecked(),
            v8::Number::New(isolate, GL_POLYGON_OFFSET_FACTOR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_BINDING_2D").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_BINDING_2D)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SAMPLE_BUFFERS").ToLocalChecked(),
            v8::Number::New(isolate, GL_SAMPLE_BUFFERS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SAMPLES").ToLocalChecked(),
            v8::Number::New(isolate, GL_SAMPLES)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SAMPLE_COVERAGE_VALUE").ToLocalChecked(),
            v8::Number::New(isolate, GL_SAMPLE_COVERAGE_VALUE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SAMPLE_COVERAGE_INVERT").ToLocalChecked(),
            v8::Number::New(isolate, GL_SAMPLE_COVERAGE_INVERT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NUM_COMPRESSED_TEXTURE_FORMATS").ToLocalChecked(),
            v8::Number::New(isolate, GL_NUM_COMPRESSED_TEXTURE_FORMATS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "COMPRESSED_TEXTURE_FORMATS").ToLocalChecked(),
            v8::Number::New(isolate, GL_COMPRESSED_TEXTURE_FORMATS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DONT_CARE").ToLocalChecked(),
            v8::Number::New(isolate, GL_DONT_CARE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FASTEST").ToLocalChecked(),
            v8::Number::New(isolate, GL_FASTEST)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NICEST").ToLocalChecked(),
            v8::Number::New(isolate, GL_NICEST)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "GENERATE_MIPMAP_HINT").ToLocalChecked(),
            v8::Number::New(isolate, GL_GENERATE_MIPMAP_HINT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BYTE").ToLocalChecked(),
            v8::Number::New(isolate, GL_BYTE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "UNSIGNED_BYTE").ToLocalChecked(),
            v8::Number::New(isolate, GL_UNSIGNED_BYTE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SHORT").ToLocalChecked(),
            v8::Number::New(isolate, GL_SHORT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "UNSIGNED_SHORT").ToLocalChecked(),
            v8::Number::New(isolate, GL_UNSIGNED_SHORT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INT").ToLocalChecked(),
            v8::Number::New(isolate, GL_INT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "UNSIGNED_INT").ToLocalChecked(),
            v8::Number::New(isolate, GL_UNSIGNED_INT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FLOAT").ToLocalChecked(),
            v8::Number::New(isolate, GL_FLOAT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FIXED").ToLocalChecked(),
            v8::Number::New(isolate, GL_FIXED)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_COMPONENT").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_COMPONENT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RGB").ToLocalChecked(),
            v8::Number::New(isolate, GL_RGB)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RGBA").ToLocalChecked(),
            v8::Number::New(isolate, GL_RGBA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LUMINANCE").ToLocalChecked(),
            v8::Number::New(isolate, GL_LUMINANCE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LUMINANCE_ALPHA").ToLocalChecked(),
            v8::Number::New(isolate, GL_LUMINANCE_ALPHA)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "UNSIGNED_SHORT_4_4_4_4").ToLocalChecked(),
            v8::Number::New(isolate, GL_UNSIGNED_SHORT_4_4_4_4)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "UNSIGNED_SHORT_5_5_5_1").ToLocalChecked(),
            v8::Number::New(isolate, GL_UNSIGNED_SHORT_5_5_5_1)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "UNSIGNED_SHORT_5_6_5").ToLocalChecked(),
            v8::Number::New(isolate, GL_UNSIGNED_SHORT_5_6_5)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAGMENT_SHADER").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAGMENT_SHADER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VERTEX_SHADER").ToLocalChecked(),
            v8::Number::New(isolate, GL_VERTEX_SHADER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_VERTEX_ATTRIBS").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_VERTEX_ATTRIBS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_VERTEX_UNIFORM_VECTORS").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_VERTEX_UNIFORM_VECTORS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_VARYING_VECTORS").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_VARYING_VECTORS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_COMBINED_TEXTURE_IMAGE_UNITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_VERTEX_TEXTURE_IMAGE_UNITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_TEXTURE_IMAGE_UNITS").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_TEXTURE_IMAGE_UNITS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_FRAGMENT_UNIFORM_VECTORS").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_FRAGMENT_UNIFORM_VECTORS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SHADER_TYPE").ToLocalChecked(),
            v8::Number::New(isolate, GL_SHADER_TYPE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DELETE_STATUS").ToLocalChecked(),
            v8::Number::New(isolate, GL_DELETE_STATUS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LINK_STATUS").ToLocalChecked(),
            v8::Number::New(isolate, GL_LINK_STATUS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VALIDATE_STATUS").ToLocalChecked(),
            v8::Number::New(isolate, GL_VALIDATE_STATUS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ATTACHED_SHADERS").ToLocalChecked(),
            v8::Number::New(isolate, GL_ATTACHED_SHADERS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ACTIVE_UNIFORMS").ToLocalChecked(),
            v8::Number::New(isolate, GL_ACTIVE_UNIFORMS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ACTIVE_UNIFORM_MAX_LENGTH").ToLocalChecked(),
            v8::Number::New(isolate, GL_ACTIVE_UNIFORM_MAX_LENGTH)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ACTIVE_ATTRIBUTES").ToLocalChecked(),
            v8::Number::New(isolate, GL_ACTIVE_ATTRIBUTES)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ACTIVE_ATTRIBUTE_MAX_LENGTH").ToLocalChecked(),
            v8::Number::New(isolate, GL_ACTIVE_ATTRIBUTE_MAX_LENGTH)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SHADING_LANGUAGE_VERSION").ToLocalChecked(),
            v8::Number::New(isolate, GL_SHADING_LANGUAGE_VERSION)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "CURRENT_PROGRAM").ToLocalChecked(),
            v8::Number::New(isolate, GL_CURRENT_PROGRAM)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NEVER").ToLocalChecked(),
            v8::Number::New(isolate, GL_NEVER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LESS").ToLocalChecked(),
            v8::Number::New(isolate, GL_LESS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "EQUAL").ToLocalChecked(),
            v8::Number::New(isolate, GL_EQUAL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LEQUAL").ToLocalChecked(),
            v8::Number::New(isolate, GL_LEQUAL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "GREATER").ToLocalChecked(),
            v8::Number::New(isolate, GL_GREATER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NOTEQUAL").ToLocalChecked(),
            v8::Number::New(isolate, GL_NOTEQUAL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "GEQUAL").ToLocalChecked(),
            v8::Number::New(isolate, GL_GEQUAL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "ALWAYS").ToLocalChecked(),
            v8::Number::New(isolate, GL_ALWAYS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "KEEP").ToLocalChecked(),
            v8::Number::New(isolate, GL_KEEP)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "REPLACE").ToLocalChecked(),
            v8::Number::New(isolate, GL_REPLACE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INCR").ToLocalChecked(),
            v8::Number::New(isolate, GL_INCR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DECR").ToLocalChecked(),
            v8::Number::New(isolate, GL_DECR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INVERT").ToLocalChecked(),
            v8::Number::New(isolate, GL_INVERT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INCR_WRAP").ToLocalChecked(),
            v8::Number::New(isolate, GL_INCR_WRAP)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DECR_WRAP").ToLocalChecked(),
            v8::Number::New(isolate, GL_DECR_WRAP)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VENDOR").ToLocalChecked(),
            v8::Number::New(isolate, GL_VENDOR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERER").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VERSION").ToLocalChecked(),
            v8::Number::New(isolate, GL_VERSION)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "EXTENSIONS").ToLocalChecked(),
            v8::Number::New(isolate, GL_EXTENSIONS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NEAREST").ToLocalChecked(),
            v8::Number::New(isolate, GL_NEAREST)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LINEAR").ToLocalChecked(),
            v8::Number::New(isolate, GL_LINEAR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NEAREST_MIPMAP_NEAREST").ToLocalChecked(),
            v8::Number::New(isolate, GL_NEAREST_MIPMAP_NEAREST)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LINEAR_MIPMAP_NEAREST").ToLocalChecked(),
            v8::Number::New(isolate, GL_LINEAR_MIPMAP_NEAREST)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NEAREST_MIPMAP_LINEAR").ToLocalChecked(),
            v8::Number::New(isolate, GL_NEAREST_MIPMAP_LINEAR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LINEAR_MIPMAP_LINEAR").ToLocalChecked(),
            v8::Number::New(isolate, GL_LINEAR_MIPMAP_LINEAR)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_MAG_FILTER").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_MAG_FILTER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_MIN_FILTER").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_MIN_FILTER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_WRAP_S").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_WRAP_S)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_WRAP_T").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_WRAP_T)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_CUBE_MAP").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_CUBE_MAP)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_BINDING_CUBE_MAP").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_BINDING_CUBE_MAP)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_CUBE_MAP_POSITIVE_X").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_CUBE_MAP_POSITIVE_X)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_CUBE_MAP_NEGATIVE_X").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_CUBE_MAP_NEGATIVE_X)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_CUBE_MAP_POSITIVE_Y").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_CUBE_MAP_POSITIVE_Y)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_CUBE_MAP_NEGATIVE_Y").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_CUBE_MAP_NEGATIVE_Y)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_CUBE_MAP_POSITIVE_Z").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_CUBE_MAP_POSITIVE_Z)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE_CUBE_MAP_NEGATIVE_Z").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE_CUBE_MAP_NEGATIVE_Z)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_CUBE_MAP_TEXTURE_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_CUBE_MAP_TEXTURE_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE0").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE0)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE1").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE1)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE2").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE2)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE3").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE3)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE4").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE4)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE5").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE5)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE6").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE6)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE7").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE7)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE8").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE8)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE9").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE9)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE10").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE10)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE11").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE11)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE12").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE12)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE13").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE13)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE14").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE14)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE15").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE15)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE16").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE16)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE17").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE17)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE18").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE18)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE19").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE19)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE20").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE20)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE21").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE21)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE22").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE22)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE23").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE23)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE24").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE24)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE25").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE25)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE26").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE26)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE27").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE27)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE28").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE28)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE29").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE29)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE30").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE30)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "TEXTURE31").ToLocalChecked(),
            v8::Number::New(isolate, GL_TEXTURE31)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "REPEAT").ToLocalChecked(),
            v8::Number::New(isolate, GL_REPEAT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "CLAMP_TO_EDGE").ToLocalChecked(),
            v8::Number::New(isolate, GL_CLAMP_TO_EDGE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MIRRORED_REPEAT").ToLocalChecked(),
            v8::Number::New(isolate, GL_MIRRORED_REPEAT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FLOAT_VEC2").ToLocalChecked(),
            v8::Number::New(isolate, GL_FLOAT_VEC2)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FLOAT_VEC3").ToLocalChecked(),
            v8::Number::New(isolate, GL_FLOAT_VEC3)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FLOAT_VEC4").ToLocalChecked(),
            v8::Number::New(isolate, GL_FLOAT_VEC4)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INT_VEC2").ToLocalChecked(),
            v8::Number::New(isolate, GL_INT_VEC2)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INT_VEC3").ToLocalChecked(),
            v8::Number::New(isolate, GL_INT_VEC3)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INT_VEC4").ToLocalChecked(),
            v8::Number::New(isolate, GL_INT_VEC4)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BOOL").ToLocalChecked(),
            v8::Number::New(isolate, GL_BOOL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BOOL_VEC2").ToLocalChecked(),
            v8::Number::New(isolate, GL_BOOL_VEC2)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BOOL_VEC3").ToLocalChecked(),
            v8::Number::New(isolate, GL_BOOL_VEC3)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "BOOL_VEC4").ToLocalChecked(),
            v8::Number::New(isolate, GL_BOOL_VEC4)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FLOAT_MAT2").ToLocalChecked(),
            v8::Number::New(isolate, GL_FLOAT_MAT2)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FLOAT_MAT3").ToLocalChecked(),
            v8::Number::New(isolate, GL_FLOAT_MAT3)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FLOAT_MAT4").ToLocalChecked(),
            v8::Number::New(isolate, GL_FLOAT_MAT4)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SAMPLER_2D").ToLocalChecked(),
            v8::Number::New(isolate, GL_SAMPLER_2D)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SAMPLER_CUBE").ToLocalChecked(),
            v8::Number::New(isolate, GL_SAMPLER_CUBE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VERTEX_ATTRIB_ARRAY_ENABLED").ToLocalChecked(),
            v8::Number::New(isolate, GL_VERTEX_ATTRIB_ARRAY_ENABLED)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VERTEX_ATTRIB_ARRAY_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_VERTEX_ATTRIB_ARRAY_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VERTEX_ATTRIB_ARRAY_STRIDE").ToLocalChecked(),
            v8::Number::New(isolate, GL_VERTEX_ATTRIB_ARRAY_STRIDE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VERTEX_ATTRIB_ARRAY_TYPE").ToLocalChecked(),
            v8::Number::New(isolate, GL_VERTEX_ATTRIB_ARRAY_TYPE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VERTEX_ATTRIB_ARRAY_NORMALIZED").ToLocalChecked(),
            v8::Number::New(isolate, GL_VERTEX_ATTRIB_ARRAY_NORMALIZED)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VERTEX_ATTRIB_ARRAY_POINTER").ToLocalChecked(),
            v8::Number::New(isolate, GL_VERTEX_ATTRIB_ARRAY_POINTER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING").ToLocalChecked(),
            v8::Number::New(isolate, GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "IMPLEMENTATION_COLOR_READ_TYPE").ToLocalChecked(),
            v8::Number::New(isolate, GL_IMPLEMENTATION_COLOR_READ_TYPE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "IMPLEMENTATION_COLOR_READ_FORMAT").ToLocalChecked(),
            v8::Number::New(isolate, GL_IMPLEMENTATION_COLOR_READ_FORMAT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "COMPILE_STATUS").ToLocalChecked(),
            v8::Number::New(isolate, GL_COMPILE_STATUS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INFO_LOG_LENGTH").ToLocalChecked(),
            v8::Number::New(isolate, GL_INFO_LOG_LENGTH)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SHADER_SOURCE_LENGTH").ToLocalChecked(),
            v8::Number::New(isolate, GL_SHADER_SOURCE_LENGTH)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SHADER_COMPILER").ToLocalChecked(),
            v8::Number::New(isolate, GL_SHADER_COMPILER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "SHADER_BINARY_FORMATS").ToLocalChecked(),
            v8::Number::New(isolate, GL_SHADER_BINARY_FORMATS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NUM_SHADER_BINARY_FORMATS").ToLocalChecked(),
            v8::Number::New(isolate, GL_NUM_SHADER_BINARY_FORMATS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LOW_FLOAT").ToLocalChecked(),
            v8::Number::New(isolate, GL_LOW_FLOAT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MEDIUM_FLOAT").ToLocalChecked(),
            v8::Number::New(isolate, GL_MEDIUM_FLOAT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "HIGH_FLOAT").ToLocalChecked(),
            v8::Number::New(isolate, GL_HIGH_FLOAT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "LOW_INT").ToLocalChecked(),
            v8::Number::New(isolate, GL_LOW_INT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MEDIUM_INT").ToLocalChecked(),
            v8::Number::New(isolate, GL_MEDIUM_INT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "HIGH_INT").ToLocalChecked(),
            v8::Number::New(isolate, GL_HIGH_INT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RGBA4").ToLocalChecked(),
            v8::Number::New(isolate, GL_RGBA4)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RGB5_A1").ToLocalChecked(),
            v8::Number::New(isolate, GL_RGB5_A1)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RGB565").ToLocalChecked(),
            v8::Number::New(isolate, GL_RGB565)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_COMPONENT16").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_COMPONENT16)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_INDEX").ToLocalChecked(),
            v8::Number::New(isolate, 0x1901) // deprecated
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_INDEX8").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_INDEX8)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_WIDTH").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_WIDTH)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_HEIGHT").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_HEIGHT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_INTERNAL_FORMAT").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_INTERNAL_FORMAT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_RED_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_RED_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_GREEN_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_GREEN_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_BLUE_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_BLUE_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_ALPHA_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_ALPHA_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_DEPTH_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_DEPTH_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_STENCIL_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_STENCIL_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "COLOR_ATTACHMENT0").ToLocalChecked(),
            v8::Number::New(isolate, GL_COLOR_ATTACHMENT0)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "DEPTH_ATTACHMENT").ToLocalChecked(),
            v8::Number::New(isolate, GL_DEPTH_ATTACHMENT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "STENCIL_ATTACHMENT").ToLocalChecked(),
            v8::Number::New(isolate, GL_STENCIL_ATTACHMENT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "NONE").ToLocalChecked(),
            v8::Number::New(isolate, GL_NONE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_COMPLETE").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_COMPLETE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_INCOMPLETE_ATTACHMENT").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_INCOMPLETE_DIMENSIONS").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_UNSUPPORTED").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_UNSUPPORTED)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "FRAMEBUFFER_BINDING").ToLocalChecked(),
            v8::Number::New(isolate, GL_FRAMEBUFFER_BINDING)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "RENDERBUFFER_BINDING").ToLocalChecked(),
            v8::Number::New(isolate, GL_RENDERBUFFER_BINDING)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "MAX_RENDERBUFFER_SIZE").ToLocalChecked(),
            v8::Number::New(isolate, GL_MAX_RENDERBUFFER_SIZE)
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "INVALID_FRAMEBUFFER_OPERATION").ToLocalChecked(),
            v8::Number::New(isolate, GL_INVALID_FRAMEBUFFER_OPERATION)
    );
}
