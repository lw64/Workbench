/* language-provider.vala
 *
 * Copyright 2022 Lorenz Wildberg <lorenz@wild-fisch.de>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

namespace Workbench {

    public interface LanguageProvider : Object {

        public abstract bool in_process { get; set; }

        public abstract Gtk.TextBuffer code { get; set; }

        public abstract Gtk.TextBuffer style { get; set; }

        public abstract Gtk.TextBuffer ui { get; set; }

        public abstract Gtk.Widget run ();
    }

    public sealed class ValaProvider : Object, LanguageProvider {

        construct {
            print ("hello!\n");
        }

        public bool in_process { get; set; }

        public Gtk.TextBuffer code { get; set; }

        public Gtk.TextBuffer style { get; set; }

        public Gtk.TextBuffer ui { get; set; }

        public Gtk.Widget run () {
            return new Gtk.Label ("hello");
        }
    }

    public void hallo () {
        print ("hello!\n");
    }
}
