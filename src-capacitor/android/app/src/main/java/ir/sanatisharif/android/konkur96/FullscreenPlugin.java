package ir.sanatisharif.android.konkur96;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import androidx.core.content.ContextCompat;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Fullscreen")
public class FullscreenPlugin extends Plugin {

  private boolean isFullscreen = false;

  @SuppressLint("InlinedApi")
  @PluginMethod
  public void enterFullscreen(PluginCall call) {

    Activity activity = getActivity();
    if (activity == null) {
      call.reject("Could not get activity");
      return;
    }

    activity.runOnUiThread(() -> {
      activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
      activity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
        WindowManager.LayoutParams.FLAG_FULLSCREEN);
      //hideSystemUI();
    });

    isFullscreen = true;
    call.resolve();
  }

  @PluginMethod
  public void exitFullscreen(PluginCall call) {

    Activity activity = getActivity();
    if (activity == null) {
      call.reject("Could not get activity");
      return;
    }

    activity.runOnUiThread(() -> {
      activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
      activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
      activity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN,
        WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
     // showSystemUI();
      setStatusBarColor();
    });

    isFullscreen = false;
    call.resolve();
  }

  @PluginMethod
  public void isFullscreen(PluginCall call) {

    JSObject result = new JSObject();
    result.put("value", isFullscreen);
    call.resolve(result);
  }

  private void setStatusBarColor() {
    Window window = getActivity().getWindow();

    // clear FLAG_TRANSLUCENT_STATUS flag:
    window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);

    // add FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS flag to the window
    window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);


    // finally change the color
    window.setStatusBarColor(ContextCompat.getColor(getContext(), R.color.main_background));
  }

  // This snippet hides the system bars.
  private void hideSystemUI() {
    // Set the IMMERSIVE flag.
    // Set the content to appear under the system bars so that the content
    // doesn't resize when the system bars hide and show.
//    getActivity().getWindow().getDecorView().setSystemUiVisibility(
//      View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
//        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
//        | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
//        | View.SYSTEM_UI_FLAG_IMMERSIVE);

    getActivity().getWindow().getDecorView().setSystemUiVisibility(
          View.SYSTEM_UI_FLAG_IMMERSIVE);
  }

  // This snippet shows the system bars. It does this by removing all the flags
  // except for the ones that make the content appear under the system bars.
  private void showSystemUI() {
    getActivity().getWindow().getDecorView().setSystemUiVisibility(
      View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
  }

}
