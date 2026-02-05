# Aplikacja do Nauki Słówek - Card Learning Application

Aplikacja webowa do nauki języków obcych za pomocą fiszek. Projekt został zrealizowany przy użyciu nowoczesnego stosu technologicznego i w pełni skonteneryzowany za pomocą Docker.

## Informacje o projekcie

**Uczestnicy:**
- [Andrii Shkolyk] - [55669]

**Data:** Luty 2026

## Technologie

### Backend
- Python 3.11
- Django 5.1.5
- Django REST Framework
- PostgreSQL 15
- Autoryzacja JWT (djangorestframework-simplejwt)
- Gunicorn

### Frontend
- React 18
- Material-UI (MUI)
- React Router DOM
- Axios
- Vite

### Infrastruktura
- Docker
- Docker Compose
- Nginx

## Architektura

Aplikacja składa się z trzech kontenerów:

1. **PostgreSQL** - relacyjna baza danych do przechowywania użytkowników, talii i fiszek
2. **Django Backend** - serwer REST API z logiką biznesową
3. **React Frontend + Nginx** - interfejs użytkownika i statyczny serwer web

## Funkcjonalności

Aplikacja posiada następujące funkcjonalności spełniające wymagania projektu:

### 1. Rejestracja użytkowników
- Tworzenie nowego konta z unikalną nazwą użytkownika
- Walidacja hasła (minimum 8 znaków)
- Potwierdzenie hasła
- Przechowywanie haseł w zaszyfrowanej formie
- Opcjonalne podanie adresu email

### 2. Autoryzacja przez tokeny JWT
- Uwierzytelnianie z użyciem JSON Web Tokens
- Access token (60 minut) i Refresh token (7 dni)
- Automatyczne zapisywanie tokenów w localStorage
- Ochrona wszystkich endpointów API przed nieautoryzowanym dostępem
- Automatyczne wylogowanie po wygaśnięciu sesji

### 3. Tworzenie talii (Create)
- Dodawanie nowych talii z nazwą i opisem
- Każda talia należy do konkretnego użytkownika
- Walidacja wymaganych pól
- Automatyczne przypisanie daty utworzenia

### 4. Przeglądanie talii (Read)
- Wyświetlanie listy wszystkich talii użytkownika
- Podgląd liczby słówek w każdej talii
- Wybór talii do nauki
- Wyświetlanie szczegółowych informacji o talii
- Przeglądanie wszystkich fiszek w wybranej talii

### 5. Edycja talii (Update)
- Modyfikacja nazwy i opisu talii
- Edycja fiszek bezpośrednio z poziomu listy
- Zmiana poziomu trudności słówka
- Aktualizacja tłumaczeń

### 6. Usuwanie talii (Delete)
- Usuwanie całych talii
- Potwierdzenie przed usunięciem
- Kaskadowe usuwanie powiązanych fiszek
- Usuwanie pojedynczych fiszek z talii

### 7. Dodawanie fiszek do talii
- Tworzenie nowych fiszek ze słowem i tłumaczeniem
- Przypisywanie poziomu trudności (1-5):
  - Very Easy (bardzo łatwe)
  - Easy (łatwe)
  - Medium (średnie)
  - Hard (trudne)
  - Very Hard (bardzo trudne)
- Automatyczna walidacja wymaganych pól
- Modalne okno dialogowe do szybkiego dodawania

### 8. Filtrowanie i sortowanie fiszek
- Filtrowanie według poziomu trudności
- Sortowanie według daty utworzenia (najnowsze pierwsze)
- Sortowanie według poziomu trudności
- Dynamiczne przeliczanie liczby wyświetlanych fiszek
- Zachowanie filtrów podczas pracy z talią

### 9. Tryb nauki (Study Mode)
- Interaktywny tryb nauki słówek
- Wyświetlanie tłumaczenia i pole do wpisania słowa
- Walidacja odpowiedzi użytkownika
- Wizualne potwierdzenie poprawności (zielona/czerwona ramka)
- Automatyczne przejście do następnej fiszki po poprawnej odpowiedzi
- Możliwość podejrzenia tłumaczenia

### 10. Obsługa klawiatury
- Naciśnięcie klawisza Enter podczas wpisywania słowa sprawdza odpowiedź
- Naciśnięcie Enter po wyświetleniu odpowiedzi przechodzi do następnej fiszki
- Usprawnienie procesu nauki bez konieczności klikania myszką
- Intuicyjny przepływ pracy

### 11. Zmiana motywu (Theme Switcher)
- Przełączanie między trybem ciemnym i jasnym
- Motyw ciemny z fioletowo-niebieską paletą kolorów
- Motyw jasny z pastelowymi, kremowymi odcieniami
- Zachowanie preferencji użytkownika
- Płynna animacja przejścia między motywami
- Ikonka słońca/księżyca w pasku nawigacyjnym

## Wymagania

- Docker (wersja 20.10 lub nowsza)
- Docker Compose (wersja 2.0 lub nowsza)

## Uruchomienie projektu

### Krok 1: Klonowanie repozytorium
```bash
git clone [URL_REPOZYTORIUM]
cd EngCardPythonBack
```

### Krok 2: Uruchomienie aplikacji

#### Pierwsze uruchomienie (z budowaniem obrazów)
```bash
docker-compose up --build
```

#### Kolejne uruchomienia (szybszy start)
```bash
docker-compose up
```

#### Uruchomienie w tle (bez logów w terminalu)
```bash
docker-compose up -d
```

Pierwsze uruchomienie może potrwać kilka minut ze względu na pobieranie obrazów Docker i instalację zależności

### Krok 3: Dostęp do aplikacji

Po pomyślnym uruchomieniu aplikacja będzie dostępna pod następującymi adresami:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/v1/
- **Admin Panel Django:** http://localhost:8000/admin/

### Pierwsza konfiguracja

Przy pierwszym uruchomieniu zaleca się utworzenie konta superużytkownika Django:
```bash
docker exec -it card_backend python manage.py createsuperuser
```

Następnie możesz zalogować się do panelu administracyjnego Django pod adresem http://localhost:8000/admin/

## Użytkowanie aplikacji

1. Otwórz przeglądarkę i przejdź do http://localhost:3000
2. Zarejestruj nowe konto lub zaloguj się
3. Utwórz swoją pierwszą talię słówek
4. Dodaj fiszki do talii
5. Rozpocznij naukę klikając przycisk "Study"

## Zatrzymanie aplikacji
```bash
docker-compose down
```

Aby usunąć także wolumeny z danymi (w tym bazę danych):
```bash
docker-compose down -v
```

## Zarządzanie podczas rozwoju

### Restart po zmianach w kodzie Python
```bash
docker-compose restart card_backend
```

### Tworzenie i aplikowanie migracji po zmianach w models.py
```bash
# Utworzenie migracji
docker exec -it card_backend python manage.py makemigrations

# Zastosowanie migracji
docker exec -it card_backend python manage.py migrate
```

### Rebuild po dodaniu nowych pakietów do requirements.txt
```bash
docker-compose up --build
```

### Rebuild tylko frontendu po zmianach w kodzie React
```bash
docker-compose up --build frontend
```

### Pełne czyszczenie (usunięcie bazy danych i ponowna inicjalizacja)
```bash
docker-compose down -v
docker-compose up --build
```

### Podgląd logów
```bash
# Wszystkie kontenery
docker-compose logs

# Konkretny kontener
docker logs card_backend
docker logs card_frontend
docker logs card_database
```

### Sprawdzenie statusu kontenerów
```bash
docker ps
```

## Struktura projektu
```
EngCardPythonBack/
├── CardSite/                    # Backend Django
│   ├── Card/                    # Aplikacja Django
│   │   ├── models.py           # Modele danych
│   │   ├── serializers.py      # Serializery DRF
│   │   ├── views.py            # Widoki API
│   │   └── urls.py             # Routing endpointów
│   ├── CardSite/               # Konfiguracja projektu
│   │   ├── settings.py         # Ustawienia Django
│   │   └── urls.py             # Główny routing
│   ├── manage.py
│   ├── requirements.txt         # Zależności Python
│   └── Dockerfile              # Obraz Docker dla backendu
├── ReactFront/card-frontend/   # Frontend React
│   ├── src/
│   │   ├── components/         # Komponenty React
│   │   ├── pages/              # Strony aplikacji
│   │   ├── api/                # Konfiguracja API
│   │   └── themes/             # Motywy kolorystyczne
│   ├── package.json
│   ├── Dockerfile              # Obraz Docker dla frontendu
│   └── nginx.conf              # Konfiguracja Nginx
├── docker-compose.yml          # Konfiguracja Docker Compose
└── README.md                   # Ten plik
```

## Endpointy API

### Autoryzacja
- `POST /api/v1/register/` - Rejestracja nowego użytkownika
- `POST /api/v1/token/` - Logowanie (otrzymanie tokenów JWT)
- `POST /api/v1/token/refresh/` - Odświeżenie access tokenu
- `POST /api/v1/token/verify/` - Weryfikacja tokenu

### Talie
- `GET /api/v1/decks/` - Lista talii użytkownika
- `POST /api/v1/decks/` - Utworzenie nowej talii
- `GET /api/v1/decks/{id}/` - Szczegóły talii z fiszkami
- `PATCH /api/v1/decks/{id}/` - Aktualizacja talii
- `DELETE /api/v1/decks/{id}/` - Usunięcie talii

### Fiszki
- `GET /api/v1/cards/` - Lista fiszek użytkownika
- `POST /api/v1/cards/` - Utworzenie nowej fiszki
- `PATCH /api/v1/cards/{id}/` - Aktualizacja fiszki
- `DELETE /api/v1/cards/{id}/` - Usunięcie fiszki

## Baza danych

Aplikacja wykorzystuje PostgreSQL z następującym schematem:

### Tabela Users (Django User model)
- id
- username
- email
- password (zaszyfrowane)

### Tabela Decks
- id
- name
- description
- user_id (klucz obcy)
- time_create

### Tabela Cards
- id
- word
- translate
- difficulty (1-5)
- is_learned (boolean)
- time_create
- user_id (klucz obcy)
- deck_id (klucz obcy)

## Autor

Andrii Shkolyk - 55669

Projekt zaliczeniowy z przedmiotu "Tworzenie aplikacji dla środowisk chmurowych"