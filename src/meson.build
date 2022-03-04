bin_conf = configuration_data()
bin_conf.set('GJS', find_program('gjs').path())
bin_conf.set('PACKAGE_VERSION', meson.project_version())
bin_conf.set('PACKAGE_NAME', meson.project_name())
bin_conf.set('prefix', prefix)
bin_conf.set('libdir', join_paths(get_option('prefix'), get_option('libdir')))
bin_conf.set('datadir', datadir)
bin_conf.set('pkgdatadir', pkgdatadir)

data_res = gnome.compile_resources('workbench',
  'workbench.gresource.xml',
  gresource_bundle: true,
  install: true,
  install_dir: pkgdatadir,
)

configure_file(
  input: 're.sonny.Workbench',
  output: 're.sonny.Workbench',
  configuration: bin_conf,
  install: true,
  install_dir: get_option('bindir')
)

configure_file(
  input: 'workbench',
  output: 'workbench',
  configuration: bin_conf,
  install: true,
  install_dir: get_option('bindir')
)

dependencies = [
  dependency('gtk4'),
  dependency('glib-2.0'),
  dependency('gobject-2.0'),
]

workbench_vala_src = [
  'language-provider.vala',
]

workbench_lib = shared_library('workbench', workbench_vala_src,
  dependencies: dependencies,
  vala_gir: 'Workbench-1.0.gir',
  install: true,
  install_dir: [true, false, false, false],
)

g_ir_compiler = find_program('g-ir-compiler')
custom_target('workbench typelib',
  command: [g_ir_compiler, '--output', '@OUTPUT@', meson.current_build_dir() / 'Workbench-1.0.gir'],
  output: 'Workbench-1.0.typelib',
  depends: workbench_lib,
  install: true,
  install_dir: get_option('libdir') / 'girepository-1.0'
)
