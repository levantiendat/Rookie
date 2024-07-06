import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori
import json

def get_non_subset_frequent_itemsets(id_song, file_path = 'hashtags_trending_video.csv', min_support=0.1):
    # Đọc file CSV
    df = pd.read_csv(file_path)

    # Lọc các dòng có id_song được chỉ định
    df = df[df['id_song'] == id_song]

    # Chuyển đổi cột Hashtags từ chuỗi sang danh sách
    df['Hashtags'] = df['Hashtags'].apply(eval)

    # Sử dụng TransactionEncoder để chuyển đổi dữ liệu
    te = TransactionEncoder()
    te_ary = te.fit(df['Hashtags']).transform(df['Hashtags'])
    df_trans = pd.DataFrame(te_ary, columns=te.columns_)

    # Áp dụng thuật toán Apriori để tìm các tập phổ biến
    frequent_itemsets = apriori(df_trans, min_support=min_support, use_colnames=True)

    # Hàm để kiểm tra nếu một itemset là tập con của bất kỳ tập nào khác ngoại trừ chính nó
    def is_not_subset(itemset, frequent_itemsets):
        # Tìm các tập phổ biến mà itemset là tập con
        subsets = frequent_itemsets[frequent_itemsets['itemsets'].apply(lambda x: itemset.issubset(x) and itemset != x)]
        # Nếu không có tập nào khác chứa itemset, thì nó không phải là tập con của bất kỳ tập nào khác
        return len(subsets) == 0

    # Lọc các tập không phải là con của bất kỳ tập nào khác ngoại trừ chính nó
    non_subsets = frequent_itemsets[frequent_itemsets['itemsets'].apply(lambda x: is_not_subset(x, frequent_itemsets))]
    # non_subsets['itemsets']# Chuyển đổi non_subsets['itemsets'] thành JSON
    non_subsets_list = non_subsets['itemsets'].apply(list).tolist()
    # Tạo từ điển chứa danh sách các tập phổ biến không phải là tập con
    non_subsets_dict = {'frequent_hashtags': non_subsets_list}
    non_subsets_json = json.dumps(non_subsets_dict, ensure_ascii=False)

    # Trả về các tập không phải là con của bất kỳ tập nào khác ngoại trừ chính nó
    return non_subsets_json

# Gọi hàm và hiển thị kết quả

id_song = 'a001'
non_subsets_json = get_non_subset_frequent_itemsets(id_song)

non_subsets_json