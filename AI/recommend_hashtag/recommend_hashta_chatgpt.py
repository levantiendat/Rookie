from openai import OpenAI
import json

client = OpenAI(
    api_key='sk-proj-69GxOw29fZo85GBqRuaCT3BlbkFJ0NqsIJw3kYGSAHTF44CT'
)


def recommend_hashtag_chatgpt(text):
    prompt = f"Please recommend popular TikTok hashtags based on the following paragraph: '{text}'"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Your output is only the hashtags in English."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.5,
    )

    hashtags = response.choices[0].message.content.strip()

    # Hàm để chuyển hashtags thành định dạng JSON
    def convert_hashtags_to_json(hashtags):
        # Giả sử hashtags được trả về là một chuỗi với các hashtags được phân tách bằng dấu phẩy
        hashtag_list = [tag.strip() for tag in hashtags.split('#') if tag.strip()]
        hashtag_list = ['#' + tag for tag in hashtag_list]
        return json.dumps({"hashtag": hashtag_list}, ensure_ascii=False)
    
    hashtags_json = convert_hashtags_to_json(hashtags)
    return hashtags_json




text = '''Trái đất - ngôi nhà chung của nhân loại - đang phải đối mặt với vô số vấn đề môi trường ngày càng nghiêm trọng. Ô nhiễm môi trường, biến đổi khí hậu, mất đa dạng sinh học,... là những thách thức to lớn mà con người cần chung tay giải quyết.
Hoạt động công nghiệp, giao thông vận tải, cùng với thói quen tiêu dùng lãng phí của con người là nguyên nhân chính dẫn đến tình trạng ô nhiễm môi trường. Khí thải độc hại từ các nhà máy, phương tiện giao thông và rác thải sinh hoạt không được xử lý triệt để đã đầu độc bầu không khí, nguồn nước và đất đai. Hệ quả là các bệnh về đường hô hấp, tim mạch, ung thư ngày càng gia tăng, đe dọa sức khỏe con người.
Biến đổi khí hậu là một vấn đề cấp bách toàn cầu. Do hiệu ứng nhà kính, nhiệt độ Trái đất tăng cao, dẫn đến băng tan, mực nước biển dâng, lũ lụt, hạn hán và các hiện tượng thời tiết cực đoan ngày càng gia tăng. Những thảm họa này gây thiệt hại to lớn về người và tài sản, ảnh hưởng nghiêm trọng đến đời sống và sản xuất của con người.
Mất đa dạng sinh học cũng là một vấn đề đáng quan ngại. Do khai thác rừng bừa bãi, săn bắt động vật hoang dã và ô nhiễm môi trường, nhiều loài động thực vật quý hiếm đang đứng trước nguy cơ tuyệt chủng. Hệ sinh thái bị phá vỡ dẫn đến mất cân bằng sinh thái, ảnh hưởng đến môi trường sống của con người.
Bảo vệ môi trường là trách nhiệm chung của mỗi cá nhân và toàn xã hội. Chúng ta cần chung tay hành động để bảo vệ ngôi nhà chung của mình. Hãy sử dụng tiết kiệm tài nguyên, tái chế rác thải, trồng cây xanh, hạn chế sử dụng túi nilon và tham gia vào các hoạt động bảo vệ môi trường.
Hãy hành động ngay từ hôm nay, vì một tương lai xanh - sạch - đẹp cho chính bản thân, con em chúng ta và cho thế hệ mai sau!'''


# print(recommend_hashtag_chatgpt(text))
hashtags_json = recommend_hashtag_chatgpt(text)
hashtags_json