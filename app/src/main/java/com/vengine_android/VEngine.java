package com.vengine_android;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class VEngine {

    private static String readAsset(String fileName) {
        BufferedReader reader = null;
        StringBuilder builder = new StringBuilder();
        try {
            reader = new BufferedReader(
                    new InputStreamReader(App.getApplication().getAssets().open(fileName), StandardCharsets.UTF_8));

            // do reading, usually loop until end of file reading
            String mLine;
            while ((mLine = reader.readLine()) != null) {
                builder.append(mLine).append("\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
            //log the exception
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    //log the exception
                }
            }
        }
        return builder.toString();
    }

    private static String getJsSourceFromAsset(String assetFileName) {
        return readAsset(assetFileName);
    }

    public static JsCompilationResult compileScriptFromAsset(String assetFileName) {
        return compileScript(assetFileName, getJsSourceFromAsset(assetFileName));
    }

    public static native void initV8();
    public static native JsCompilationResult compileScript(String fileName, String source);
    public static native void updateFrame();

    public static native void dispose();

    public static void onSurfaceWidthChanged(int width) {
        App.surfaceResizer.setWidth(width);
    }

    public static void onSurfaceHeightChanged(int height) {
        App.surfaceResizer.setHeight(height);
    }

}
