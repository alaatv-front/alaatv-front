package ir.sanatisharif.android.konkur96;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.community.database.sqlite.CapacitorSQLitePlugin;

// import io.sentry.Sentry;
// import io.sentry.android.core.SentryAndroid;

//import io.sentry.SentryLevel;
//import io.sentry.android.core.SentryAndroid;
//import android.app.Application;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    registerPlugin(CapacitorSQLitePlugin.class);  // Register the SQLite plugin
    registerPlugin(FullscreenPlugin.class);
    super.onCreate(savedInstanceState);


//    SentryAndroid.init(this, options -> {
//      options.setDsn("http://38212ccd900490677dcf90bd12447f30@sentry.alaa.tv/3");
//      // Add a callback that will be used before the event is sent to Sentry.
//      // With this callback, you can modify the event or, when returning null, also discard the event.
//      options.setBeforeSend((event, hint) -> {
//        if (SentryLevel.DEBUG.equals(event.getLevel()))
//          return null;
//        else
//          return event;
//      });
//    });

//     SentryAndroid.init(this, options -> {
//         options.setDsn(BuildConfig.SENTRY_DSN); // Retrieve the DSN from BuildConfig
//         // Here, you can set release name, environment, etc.
//         // options.setRelease("your release version here");
//         // options.setEnvironment("your environment here");
//     });
    setStatusBarColor();
  }

  private void setStatusBarColor() {
    Window window = getWindow();

    // clear FLAG_TRANSLUCENT_STATUS flag:
    window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);

    // add FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS flag to the window
    window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

    // finally change the color
    window.setStatusBarColor(ContextCompat.getColor(this, R.color.main_background));
  }
}
