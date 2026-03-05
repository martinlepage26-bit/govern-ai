"""
Publications API Tests
Tests for GET /api/publications, GET /api/publications/{id}, GET /api/publications/tags/all
and tag filtering functionality.
Admin endpoints (POST, PUT, DELETE) require authentication and are tested separately.
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')


class TestPublicationsPublicEndpoints:
    """Test public (unauthenticated) publications endpoints"""

    def test_get_all_publications(self):
        """GET /api/publications - Returns list of publications"""
        response = requests.get(f"{BASE_URL}/api/publications")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        assert len(data) > 0, "Should return at least one publication (seed data)"
        
        # Validate structure of first publication
        pub = data[0]
        assert "id" in pub, "Publication should have id"
        assert "title" in pub, "Publication should have title"
        assert "abstract" in pub, "Publication should have abstract"
        assert "date" in pub, "Publication should have date"
        assert "tags" in pub, "Publication should have tags"
        print(f"SUCCESS: GET /api/publications returned {len(data)} publications")

    def test_get_publications_filter_by_tag(self):
        """GET /api/publications?tag=X - Filters publications by tag"""
        tag = "AI Governance"
        response = requests.get(f"{BASE_URL}/api/publications", params={"tag": tag})
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        
        # Verify all returned publications have the tag
        for pub in data:
            assert tag in pub.get("tags", []), f"Publication {pub['id']} should have tag '{tag}'"
        print(f"SUCCESS: GET /api/publications?tag={tag} returned {len(data)} filtered publications")

    def test_get_publications_filter_nonexistent_tag(self):
        """GET /api/publications?tag=NonExistent - Returns empty list for non-existent tag"""
        tag = "NonExistentTagXYZ123"
        response = requests.get(f"{BASE_URL}/api/publications", params={"tag": tag})
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        assert len(data) == 0, f"Expected empty list for non-existent tag, got {len(data)}"
        print(f"SUCCESS: GET /api/publications?tag={tag} returned empty list as expected")

    def test_get_single_publication(self):
        """GET /api/publications/{id} - Returns single publication with full content"""
        pub_id = "pub-1"
        response = requests.get(f"{BASE_URL}/api/publications/{pub_id}")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data["id"] == pub_id, f"Expected id '{pub_id}', got {data.get('id')}"
        assert "title" in data, "Publication should have title"
        assert "abstract" in data, "Publication should have abstract"
        assert "content" in data, "Single publication should have content field"
        assert data["content"] is not None, "Content should not be null for seed publication"
        print(f"SUCCESS: GET /api/publications/{pub_id} returned full publication with content")

    def test_get_single_publication_not_found(self):
        """GET /api/publications/{id} - Returns 404 for non-existent publication"""
        pub_id = "nonexistent-pub-xyz123"
        response = requests.get(f"{BASE_URL}/api/publications/{pub_id}")
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print(f"SUCCESS: GET /api/publications/{pub_id} returned 404 as expected")

    def test_get_all_tags(self):
        """GET /api/publications/tags/all - Returns all unique tags"""
        response = requests.get(f"{BASE_URL}/api/publications/tags/all")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        assert len(data) > 0, "Should return at least one tag from seed data"
        
        # Validate tags are strings and sorted
        for tag in data:
            assert isinstance(tag, str), f"Tag should be string, got {type(tag)}"
        
        # Check tags are sorted
        assert data == sorted(data), "Tags should be sorted alphabetically"
        print(f"SUCCESS: GET /api/publications/tags/all returned {len(data)} tags: {data}")


class TestPublicationsAdminEndpoints:
    """Test admin-only publications endpoints (require authentication)"""

    def test_create_publication_unauthorized(self):
        """POST /api/publications - Returns 401 without authentication"""
        payload = {
            "title": "Test Publication",
            "abstract": "Test abstract",
            "date": "2026-01",
            "tags": ["Test"]
        }
        response = requests.post(f"{BASE_URL}/api/publications", json=payload)
        # Should return 401 Unauthorized or 403 Forbidden
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"
        print(f"SUCCESS: POST /api/publications returned {response.status_code} (unauthorized)")

    def test_update_publication_unauthorized(self):
        """PUT /api/publications/{id} - Returns 401 without authentication"""
        pub_id = "pub-1"
        payload = {"title": "Updated Title"}
        response = requests.put(f"{BASE_URL}/api/publications/{pub_id}", json=payload)
        # Should return 401 Unauthorized or 403 Forbidden
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"
        print(f"SUCCESS: PUT /api/publications/{pub_id} returned {response.status_code} (unauthorized)")

    def test_delete_publication_unauthorized(self):
        """DELETE /api/publications/{id} - Returns 401 without authentication"""
        pub_id = "pub-1"
        response = requests.delete(f"{BASE_URL}/api/publications/{pub_id}")
        # Should return 401 Unauthorized or 403 Forbidden
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"
        print(f"SUCCESS: DELETE /api/publications/{pub_id} returned {response.status_code} (unauthorized)")


class TestPublicationDataValidation:
    """Test publication data structure and content validation"""

    def test_publication_has_required_fields(self):
        """Verify all publications have required fields"""
        response = requests.get(f"{BASE_URL}/api/publications")
        assert response.status_code == 200
        
        data = response.json()
        required_fields = ["id", "title", "abstract", "date", "tags"]
        
        for pub in data:
            for field in required_fields:
                assert field in pub, f"Publication {pub.get('id', 'unknown')} missing field '{field}'"
        print(f"SUCCESS: All {len(data)} publications have required fields")

    def test_publications_sorted_by_date(self):
        """Verify publications are sorted by date (descending)"""
        response = requests.get(f"{BASE_URL}/api/publications")
        assert response.status_code == 200
        
        data = response.json()
        if len(data) > 1:
            dates = [pub["date"] for pub in data]
            # Dates should be in descending order
            assert dates == sorted(dates, reverse=True), f"Publications not sorted by date: {dates}"
        print(f"SUCCESS: Publications are sorted by date (descending)")

    def test_seed_publications_exist(self):
        """Verify seed publications are available"""
        seed_ids = ["pub-1", "pub-2", "pub-3"]
        
        for pub_id in seed_ids:
            response = requests.get(f"{BASE_URL}/api/publications/{pub_id}")
            assert response.status_code == 200, f"Seed publication {pub_id} not found"
            
            data = response.json()
            assert data["id"] == pub_id
            assert len(data["title"]) > 0
            assert len(data["abstract"]) > 0
        print(f"SUCCESS: All seed publications ({', '.join(seed_ids)}) exist and accessible")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
