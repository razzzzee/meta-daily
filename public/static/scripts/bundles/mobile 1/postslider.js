            var element = document.getElementsByName('slide');
            var count = 0;
            var elem=document.getElementById("MetaverseDailyHeroContent");
            elem.addEventListener('animationiteration', function(e) {
                $(".state-has-image").css("background-image", 
                                "url('"+element.item(count).getAttribute('src')+"')");
                $(".hero-content-eyebrow").text(element.item(count).getAttribute('category'));
                $("a.hero-content-title-text").attr("href", element.item(count).getAttribute('postPath'));
                $(".hero-content-title-text").text(element.item(count).getAttribute('alt'));

                $(".hero-content-source").text(element.item(count).getAttribute('source'));
                
                if(element.item(count).getAttribute('isEvent')=='1')
                    $(".hero-content-date").text(element.item(count).getAttribute('eventDate'));
                else
                    $(".hero-content-date").text(element.item(count).getAttribute('date')); 
                $(".hero-content-location").text(element.item(count).getAttribute('location'));
                $(".hero-content-hashtag1").text(element.item(count).getAttribute('hashTag1'));
                $(".hero-content-emotion").attr("src", element.item(count).getAttribute('emojiEmotionImagePath'));
                $(".hero-content-hashtag2").text(element.item(count).getAttribute('hashTag2'));
                $(".hero-content-hashtag3").text(element.item(count).getAttribute('hashTag3'));
                count = count+1;
                if(count>4)
                {
                    count=0;
                }
            });
