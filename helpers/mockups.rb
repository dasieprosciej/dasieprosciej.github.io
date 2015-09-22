
module Mockups
  def mockup(type, scroll, content_url,  options={})
    if !(type == :imac || type == :laptop || type == :iphone || type == :iphone_black)  && options[:type].blank?
      raise ArgumentError.new("You should pass :type option key explicitly, because you have passed #{type} type other than :laptop, :imac, :iphone, :iphone_black.")
    end

    case type
    when :imac
      mock = '/images/mockups/mockup-imac.png'
      mock_class = 'mockup mockup-imac'
    when :laptop
      mock = '/images/mockups/mockup-laptop.png'
      mock_class = 'mockup mockup-laptop'
    when :iphone
      mock = '/images/mockups/mockup-iphone.png'
      mock_class = 'mockup mockup-iphone'
    when :iphone_black 
      mock = '/images/mockups/mockup-iphone-black.png'
      mock_class = 'mockup mockup-iphone'
    end

    case scroll
    when :scroll
      mock_class += ' mockup-scroll'
    end  
    
    content = content_tag :img ,nil, 'data-layzr' => imgpath(content_url), :alt => ""


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