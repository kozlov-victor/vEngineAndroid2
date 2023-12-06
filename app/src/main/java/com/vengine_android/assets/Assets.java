package com.vengine_android.assets;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.vengine_android.app.App;
import com.vengine_android.model.BitmapInfo;
import com.vengine_android.utils.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class Assets {

    private final Map<Integer,Bitmap> bitmapCache = new HashMap<>();

    private String processLocalUrl(String url){
        if (url.startsWith("./")) url = url.replace("./","");
        if (url.contains("?")) url = url.split("\\?")[0];
        return url;
    }

    public String readAsset(String fileName) {
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
            Logger.error(e.toString());
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    Logger.error(e.toString());
                }
            }
        }
        return builder.toString();
    }

    private Bitmap convertString64ToImage(String base64String) {
        byte[] decodedString = Base64.decode(base64String, Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
    }

    public BitmapInfo loadBitmap(String fileName) {
        fileName = processLocalUrl(fileName);
        Bitmap bitmap;
        if (fileName.startsWith("data:image") && fileName.contains(",")) {
            bitmap = convertString64ToImage(fileName.split(",")[1]);
        }
        else {
            try(InputStream inputStream = App.getContext().getAssets().open(fileName)) {
                bitmap = BitmapFactory.decodeStream(inputStream);
            } catch (IOException e) {
                e.printStackTrace();
                return new BitmapInfo(0,0,0);
            }
        }
        int key = bitmapCache.size() + 1;
        bitmapCache.put(key,bitmap);
        return new BitmapInfo(key,bitmap.getWidth(),bitmap.getHeight());
    }

    public Bitmap getCachedBitmap(int id) {
        return bitmapCache.get(id);
    }



}
