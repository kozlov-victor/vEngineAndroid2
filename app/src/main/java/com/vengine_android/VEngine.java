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

    public static String getJsSource() {
        return readAsset("bootstrap.js");
    }

    public static native void initV8();
    public static native JsCompilationResult compileScriptSource();
    public static native void updateFrame();

}
