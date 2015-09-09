module Mixin
##################################################################################################
#
# Mixin helper
# ============
#
# This helper is a shortcut for the Padrino's `partial` helper.
#
# It is invoked just like the original `partial` helper.
# It searches for partials under `/source/partials` rather than `/source`.
#
# In addition to :collection, :engine, :object and :locals, you can
# pass additional key-value pairs. Those additional pairs will be available
# within a partial as a hash under a local variable `options`.
#
# The `options` local variable is always available within the partial,
# overwriting a `locals: {options: ...}`.
#
# If no arguments to be stored within `options` are provided, then
# `options` is an empty hash. This is very convenient, because you
# don't need to check whether a local variable exists (Ruby returns nil
# for non-existing hash items). Thus, you can do do `<%= options[:foo] %>`
# instead of `<%= foo if defined? foo %>`.
#
# The `mixin` helper also accepts a block! It will be available as
# `options[:yield]` within a partial. Note that the block will overwrite
# `yield: ...` and `locals: {options: {yield: ...}}` arguments.
#
# Example usage (Haml):
#
#    = mixin :thumbnail, title: 'A fancy car' do
#      %img{src: 'corvette.jpg'}
#
# This is equivalent to:
#
#     - temp_var = capture_html do
#       %img{src: 'corvette.jpg'}
#
#     = partial `partials/thumbnail`,
#               locals: {options: {title: 'A fancy car',
#                                  yield: temp_var}}
#
##################################################################################################

def mixin(partial_name, options = {}, &content_block)

  # Moving standard Padrino's `partial` arguments into the `new_options` hash
  new_options = {}
  [:collection, :engine, :object, :locals].each do |option|
    new_options[option] = options.delete(option) if options[option]
  end

  # Move remaining arguments into `new_options[:locals][:options]`
  new_options[:locals] ||= {}
  new_options[:locals][:options] = options || {}

  # Move a block into `new_options[:locals][:options][:yield]`
  if block_given?
    new_options[:locals][:options][:yield] = capture_html(&content_block)
  end

  # Partials are supposed to be stored under `/source/partials`
  path = 'mixins/' + partial_name.to_s

  # Invoking the standard partial mixin with the new path and new_options
  partial path, new_options
end


end