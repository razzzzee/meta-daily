            var element = document.getElementsByName('slide');
            var count = 0;
            var elem=document.getElementById("idHeroContent");
            elem.addEventListener('animationiteration', function(e) {
                $(".hero-content-title-text").text(element.item(count).getAttribute('alt'));
                $(".hero-content-source").text(element.item(count).getAttribute('source'));
                $(".hero-content-eyebrow").text(element.item(count).getAttribute('category'));
                $(".hero-content-date").text(element.item(count).getAttribute('date'));
                $(".state-has-image").css("background-image", 
                                "url('"+element.item(count).getAttribute('src')+"')");
                $("a.hero-content-title-text").attr("href", element.item(count).getAttribute('postPath'));
                $("a.hero-content-source").attr("href", element.item(count).getAttribute('sourcePath'));
                
                count = count+1;
                if(count>3)
                {
                    count=0;
                }
            });