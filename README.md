# Egzersiz Rehberi Uygulaması

![Egzersiz Rehberi](\egzersiz-rehberi-uygulamasi\src\assets\logo\logo.png)

## 📱 Proje Tanımı

Egzersiz Rehberi, kullanıcılara kapsamlı bir fitness deneyimi sunan modern bir web uygulamasıdır. Yüzlerce farklı egzersizi detaylı açıklamalar, animasyonlu görseller ve hedef kas bilgileriyle sunar. Vücut bölgelerine göre egzersizleri keşfedebilir, arama yapabilir ve favori egzersizlerinizi kaydedebilirsiniz.

## 🚀 Özellikler

- **Vücut Bölgelerine Göre Filtreleme**: Çalıştırmak istediğiniz vücut bölgesine göre egzersizleri görüntüleyin
- **Detaylı Egzersiz Sayfaları**: Her egzersiz için başlangıç pozisyonu, hareket açıklamaları ve ipuçları
- **Favoriler Sistemi**: Beğendiğiniz egzersizleri kaydedin ve istediğiniz zaman erişin
- **Arama Fonksiyonu**: Egzersiz adı, hedef kas veya ekipman türüne göre arama yapın
- **Benzer Egzersizler**: Her egzersiz sayfasında aynı kas grubunu çalıştıran alternatif hareketleri görün
- **Responsive Tasarım**: Tüm cihazlarda kusursuz deneyim

## 🔧 Teknolojiler

- **React + TypeScript + Vite**: Modern ve hızlı geliştirme ortamı
- **React Router**: Sayfa yönlendirmesi için
- **React Query**: Veri yönetimi ve API istekleri için
- **Tailwind CSS**: Şık ve responsive tasarım için
- **Axios**: API istekleri için
- **ExerciseDB API**: Kapsamlı egzersiz verileri için

## 📋 Kurulum ve Kullanım

1. Repoyu bilgisayarınıza klonlayın:
```bash
git clone https://github.com/kullanici-adi/egzersiz-rehberi-uygulamasi.git
cd egzersiz-rehberi-uygulamasi
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun ve RapidAPI anahtarınızı ekleyin:
```
VITE_RAPIDAPI_KEY=sizin_rapidapi_anahtariniz
VITE_RAPIDAPI_HOST=exercisedb.p.rapidapi.com
```

4. Uygulamayı geliştirme modunda başlatın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:5173](http://localhost:5173) adresini ziyaret edin

## 🏗️ Proje Yapısı

```
egzersiz-rehberi-uygulamasi/
├── src/
│   ├── assets/             # Görseller ve statik dosyalar
│   ├── components/         # Yeniden kullanılabilir bileşenler
│   ├── hooks/              # Özel React hook'ları
│   ├── pages/              # Sayfa bileşenleri
│   ├── services/           # API ve servis fonksiyonları
│   ├── types/              # TypeScript tipleri ve arayüzleri
│   ├── utils/              # Yardımcı fonksiyonlar
│   ├── App.tsx             # Ana uygulama bileşeni
│   └── main.tsx            # Uygulama giriş noktası
├── public/                 # Statik genel dosyalar
├── index.html              # HTML şablonu
├── package.json            # Proje bağımlılıkları
├── tsconfig.json           # TypeScript yapılandırması
└── vite.config.ts          # Vite yapılandırması
```

## 📱 Ekran Görüntüleri

![Ana Sayfa](\egzersiz-rehberi-uygulamasi\src\assets\screenshots\HomePage.jpg)
![Egzersizler Sayfası](\egzersiz-rehberi-uygulamasi\src\assets\screenshots\Exercises.jpg)
![Egzersiz Detay](\egzersiz-rehberi-uygulamasi\src\assets\screenshots\ExerciseDetail.jpg)
![Favoriler](\egzersiz-rehberi-uygulamasi\src\assets\screenshots\Favorites.jpg)
