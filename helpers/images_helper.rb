module ImagesHelper
  def imgpath(relative_path)
    if $current_listed_article.nil?
      # On page
      url = current_page.url
    else
      # In listing
      url = $current_listed_article.url
    end

    "#{url}images/#{relative_path}"  # return
  end   

  # def img(relative_path, alt=nil)
  #   if $current_listed_article.nil?
  #     # On page
  #     url = current_page.url
  #   else
  #     # In listing
  #     url = $current_listed_article.url
  #   end
  #   alt ? alt_attr = "alt='#{alt}' " : alt_attr = ''

  #   "<img #{alt_attr} src='#{url}images/#{relative_path}'>"  # return
  # end   

  def img(url, options={})
    options.reverse_merge!(:src => imgpath(url))
    tag(:img, options)
  end

  # Acts as a thin wrapper for image_tag and generates an srcset attribute for regular image tags
  # for usage with responsive images polyfills like picturefill.js, supports asset pipeline path helpers.
  #
  # image_set_tag 'pic_1980.jpg', { 'pic_640.jpg' => '640w', 'pic_1024.jpg' => '1024w', 'pic_1980.jpg' => '1980w' }, sizes: '100vw', class: 'my-image'
  # 
  # => <img src="/assets/ants_1980.jpg" srcset="/assets/pic_640.jpg 640w, /assets/pic_1024.jpg 1024w, /assets/pic_1980.jpg 1980w" sizes="100vw" class="my-image">
  #
  def image_set_tag(source, srcset = {}, options = {})
    srcset = srcset.map { |src, size| "#{imgpath(src)} #{size}" }.join(', ')
    image_tag(imgpath(source), options.merge(srcset: srcset))
  end

end