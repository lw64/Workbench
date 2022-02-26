import Source from "gi://GtkSource?version=5";
import Gio from "gi://Gio";
import GLib from "gi://GLib";

const language_manager = Source.LanguageManager.get_default();

const data_dir = GLib.build_filenamev([
  GLib.get_user_data_dir(),
  "re.sonny.Workbench",
]);

const data_dir_file = Gio.File.new_for_path(data_dir);
try {
  data_dir_file.make_directory(null);
} catch (err) {
  if (err.code !== Gio.IOErrorEnum.EXISTS) {
    logError(err);
  }
}

export default function Document({ source_view, lang, placeholder_path, ext }) {
  const { buffer } = source_view;

  buffer.set_language(language_manager.get_language(lang));

  const file = Gio.File.new_for_path(
    GLib.build_filenamev([data_dir, `state.${ext}`])
  );

  const source_file = new Source.File({
    location: file,
  });

  load();

  buffer.connect("changed", () => {
    log("changed");
  });

  buffer.connect("modified-changed", () => {
    // log("modified-changed");
    const modified = buffer.get_modified();
    if (!modified) return;

    log("modified");
    save();
  });

  function load() {
    const file_loader = new Source.FileLoader({
      buffer,
      file: source_file,
    });
    file_loader.load_async(
      GLib.PRIORITY_DEFAULT,
      null,
      null,
      (self, result) => {
        let success;
        try {
          success = file_loader.load_finish(result);
        } catch (err) {
          if (err.code !== Gio.IOErrorEnum.NOT_FOUND) {
            logError(err);
          }
        }
        if (success) buffer.set_modified(false);
        if (!success) reset();
      }
    );
  }

  function save() {
    const file_saver = new Source.FileSaver({
      buffer,
      file: source_file,
    });
    file_saver.save_async(GLib.PRIORITY_DEFAULT, null, null, (self, result) => {
      const success = file_saver.save_finish(result);
      if (success) buffer.set_modified(false);
    });
  }

  function reset() {
    const decoder = new TextDecoder("utf-8");
    const text = decoder.decode(
      Gio.File.new_for_path(placeholder_path).load_contents(null)[1]
    );
    buffer.set_text(text, -1);
  }

  return { reset };
}
