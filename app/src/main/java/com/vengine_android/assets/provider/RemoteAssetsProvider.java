package com.vengine_android.assets.provider;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.vengine_android.utils.Logger;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;

public class RemoteAssetsProvider extends AbstractAccessProvider {

    private String remoteBaseUrl;

    public void setRemoteBaseUrl(String remoteBaseUrl) {
        if (!remoteBaseUrl.startsWith("http://") && !remoteBaseUrl.startsWith("https://")) {
            throw new RuntimeException("malformed remoteBaseUrl, should start with http:// or with https://");
        }
        if (!remoteBaseUrl.endsWith("/")) remoteBaseUrl = remoteBaseUrl + "/";
        this.remoteBaseUrl = remoteBaseUrl;
    }

    public boolean isEnabled() {
        return remoteBaseUrl!=null;
    }

    private InputStream getInputStream(String resourceUrl) {
        try {
            URL url = new URL(resourceUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            if(conn.getResponseCode() == HttpURLConnection.HTTP_OK){
                return conn.getInputStream();
            }
            else {
                throw new RuntimeException(conn.getResponseMessage());
            }
        } catch (Exception e) {
            Logger.error(resourceUrl);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Bitmap loadBitmap(String resourceUrl) {
        resourceUrl = joinUrl(resourceUrl);
        InputStream inputStream = getInputStream(resourceUrl);
        return BitmapFactory.decodeStream(inputStream);
    }

    @Override
    public String loadString(String resourceUrl) {
        resourceUrl = joinUrl(resourceUrl);
        InputStream inputStream = getInputStream(resourceUrl);
        return loadString(inputStream);
    }

    @Override
    public ByteBuffer loadBinary(String resourceUrl) {
        resourceUrl = joinUrl(resourceUrl);
        InputStream inputStream = getInputStream(resourceUrl);
        return loadBinary(inputStream);
    }

    private String joinUrl(String url){
        if (url.startsWith("./")) url = url.substring(2);
        if (url.startsWith("/")) url = url.substring(1);
        return remoteBaseUrl + url;
    }

}
