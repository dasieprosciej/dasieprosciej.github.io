
module Mockups
  def mockup(type, scroll, content_url,  options={})
    if !(type == :imac || type == :laptop || type == :iphone || type == :iphone_black || type == :iphone_transparent)  && options[:type].blank?
      raise ArgumentError.new("You should pass :type option key explicitly, because you have passed #{type} type other than :laptop, :imac, :iphone, :iphone_black, :iphone_transparent")
    end

    case type
    when :imac
      mock = '/images/mockups/mockup-imac.png'
      mock_class = 'mockup mockup-imac'
    when :laptop
      mock = '/images/mockups/mockup-laptop2.png'
      mock_class = 'mockup mockup-laptop'
    when :iphone
      mock = '/images/mockups/mockup-iphone2.png'
      mock_class = 'mockup mockup-iphone'
    when :iphone_black 
      mock = '/images/mockups/mockup-iphone-black2.png'
      mock_class = 'mockup mockup-iphone'
    when :iphone_transparent 
      mock = '/images/mockups/mockup-iphone-transparent.png'
      mock_class = 'mockup mockup-iphone'
    end

    case scroll
    when :scroll
      mock_class += ' mockup-scroll'
    end  

    width, height = FastImage.size(@site + imgpath(content_url), :raise_on_failure => true)
    aspect_ratio = number_to_percentage(height.to_f / width * 100, precision: 4)

    
    img_content = content_tag(:img ,nil, 'data-layzr' => imgpath(content_url), :alt => "")
    noscript = content_tag(:noscript, content_tag(:img ,nil, 'src' => imgpath(content_url), :alt => ""))

    
    ratio_content = content_tag(:span, img_content, :class => "aspect-ratio", :style => "padding-bottom: #{aspect_ratio}")



    # content = img_content + noscript
    content = ratio_content + noscript
    


    content_tag :div ,class: mock_class do
      content_tag(:img ,nil, :src => mock) +
      # content_tag(:img ,nil, "data-layzr" => mock) + 
      content_tag(:div ,content, class: "artwork", id: options[:id]) +
      if scroll
      content_tag(:div ,nil, class: "mockup-shade")
      end
    end      
  end

end